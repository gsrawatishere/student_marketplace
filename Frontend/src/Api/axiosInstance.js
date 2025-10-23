import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4001/api/v1',
  withCredentials: true, // This is essential for sending secure cookies
});

// --- Interceptor Logic ---

// A queue to hold requests that failed with a 401 error while the token is being refreshed.
let failedRequestQueue = [];
// A flag to prevent multiple token refresh requests from being sent simultaneously.
let isRefreshing = false;

/**
 * Processes all requests in the queue, either by retrying them with the new token
 * or by rejecting them if the token refresh failed.
 * @param {Error|null} error - The error from the refresh token call.
 * @param {string|null} token - The new access token.
 */
const processQueue = (error, token = null) => {
  failedRequestQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedRequestQueue = [];
};

axiosInstance.interceptors.response.use(
  // If a response is successful (status 2xx), just return it.
  (response) => {
    return response;
  },
  // If a response has an error, this function will be triggered.
  async (error) => {
    const originalRequest = error.config;

    // We only want to handle 401 errors and avoid getting into a refresh loop.
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a token refresh is already in progress, we add the failed request to a queue.
        // This returns a new Promise that will wait until the refresh is complete.
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({ resolve, reject });
        })
          .then(token => {
            // Once a new token is available, update the header and retry the request.
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      // Mark this request as a retry to prevent infinite loops.
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to get a new access token using your refresh token endpoint.
        const { data } = await axiosInstance.post('/auth/refresh-token');
        const newAccessToken = data.accessToken;

        // Update the header of the original failed request.
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Retry all the requests that were queued up while we were refreshing the token.
        processQueue(null, newAccessToken);

        // Finally, retry the original request that initiated the refresh.
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        // If the refresh token endpoint itself fails, it means the user's session is truly expired.
        processQueue(refreshError, null);
        
        console.error("Session has expired. User needs to log in again.");
        
        // KEY CHANGE: Instead of a hard redirect, we reject the promise.
        // This allows the error to be handled by the .catch() block in your AuthProvider
        // or wherever the initial API call was made.
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For all other errors, just return the error.
    return Promise.reject(error);
  }
);

export default axiosInstance;