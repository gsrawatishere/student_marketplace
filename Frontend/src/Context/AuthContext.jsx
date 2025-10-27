import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../api/axiosinstance";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/profile/me");
      if (response.status === 200) {
        setUser(response.data.profile);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn("User not authenticated. Logging out...");
        const path = location.pathname;

        // ✅ Don't redirect for admin routes or registration pages
        const isAdminRoute = path.startsWith("/admin");
        const isRegisterRoute =
          path.startsWith("/register") || path.startsWith("/signup");

        if (!isAdminRoute && !isRegisterRoute) {
          navigate("/login");
        }

        setUser(null);
      } else {
        console.error("Failed to fetch user in context:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const path = location.pathname;

    // ✅ Skip fetching user for admin or register routes
    const isAdminRoute = path.startsWith("/admin");
    const isRegisterRoute =
      path.startsWith("/register") || path.startsWith("/signup");

    if (!isAdminRoute && !isRegisterRoute) {
      fetchUser();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);