import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    console.log(token)
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuth(false);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoggedIn: isAuth, // Add this alias for compatibility
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);