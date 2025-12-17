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

<<<<<<< HEAD
  const login = (token, refreshToken = null) => {
    if (!token) {
      console.error("Login called without token");
      return;
=======
  const login = async (token, refreshToken = null) => {
    if (!token) {
      console.error("Login called without token");
      return false;
>>>>>>> dd81ab68ad52f6811e1cc2eec59ae94996be9e7f
    }
    
    localStorage.setItem("accessToken", token);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
<<<<<<< HEAD
    setIsAuth(true);
    
    getProfile().then(response => {
      if (response.data?.success) {
        setUser(response.data.data);
      }
    }).catch(err => {
=======
    
    try {
      const response = await getProfile();
      if (response.data?.success) {
        setUser(response.data.data);
        setIsAuth(true);
        return true;
      } else {
        setIsAuth(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        return false;
      }
    } catch (err) {
>>>>>>> dd81ab68ad52f6811e1cc2eec59ae94996be9e7f
      if (err.response?.status === 401 || 
          (err.response?.status === 500 && 
           err.response?.data?.message?.toLowerCase().includes('jwt malformed'))) {
        setIsAuth(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
<<<<<<< HEAD
      } else {
        console.warn("Profile fetch failed after login:", err.response?.status || err.message);
      }
    });
=======
        return false;
      } else {
        console.warn("Profile fetch failed after login:", err.response?.status || err.message);
        setIsAuth(true);
        return false;
      }
    }
>>>>>>> dd81ab68ad52f6811e1cc2eec59ae94996be9e7f
  };
  
  const refreshProfile = async () => {
    try {
      const response = await getProfile();
      if (response.data?.success) {
        setUser(response.data.data);
<<<<<<< HEAD
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to refresh profile:", err);
      return false;
=======
        setIsAuth(true);
        return true;
      } else {
        setIsAuth(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        return false;
      }
    } catch (err) {
      if (err.response?.status === 401 || 
          (err.response?.status === 500 && 
           err.response?.data?.message?.toLowerCase().includes('jwt malformed'))) {
        setIsAuth(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        return false;
      } else {
        console.error("Failed to refresh profile:", err.response?.status || err.message);
        return false;
      }
>>>>>>> dd81ab68ad52f6811e1cc2eec59ae94996be9e7f
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
