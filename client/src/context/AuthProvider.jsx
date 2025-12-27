import { useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";
import { getProfile } from "../services";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const authenticated = isAuthenticated();
      
      if (authenticated) {
        try {
          const response = await getProfile();
          if (response.data?.success) {
            setUser(response.data.data);
            setIsAuth(true);
          } else {
            setIsAuth(false);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        } catch (err) {
          if (err.response?.status === 401 || 
              (err.response?.status === 500 && 
               err.response?.data?.message?.toLowerCase().includes('jwt malformed'))) {
            setIsAuth(false);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          } else {
            console.warn("Profile fetch failed:", err.response?.status || err.message);
            setIsAuth(true);
          }
        }
      } else {
        setIsAuth(false);
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);

  const login = (token, refreshToken = null) => {
    if (!token) {
      console.error("Login called without token");
      return;
    }
    
    localStorage.setItem("accessToken", token);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    setIsAuth(true);
    
    getProfile().then(response => {
      if (response.data?.success) {
        const userData = response.data.data;
        setUser(userData);
        // Note: ProtectedRoute will handle redirect to /account if isProfileComplete is false
      }
    }).catch(err => {
      if (err.response?.status === 401 || 
          (err.response?.status === 500 && 
           err.response?.data?.message?.toLowerCase().includes('jwt malformed'))) {
        setIsAuth(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
      } else {
        console.warn("Profile fetch failed after login:", err.response?.status || err.message);
      }
    });
  };
  
  const refreshProfile = async () => {
    try {
      const response = await getProfile();
      if (response.data?.success) {
        setUser(response.data.data);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to refresh profile:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuth(false);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoggedIn: isAuth,
        loading,
        user,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
