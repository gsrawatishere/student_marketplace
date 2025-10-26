import { Children } from "react";
import { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../Api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/profile/me");
      if (response.status == 200) {
        setUser(response.data.profile);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.warn("User not authenticated. Logging out...");
        navigate("/login");
        setUser(null); 
      } else {
        console.error("Failed to fetch user in context:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if(!user){
      fetchUser();
      }
       
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


