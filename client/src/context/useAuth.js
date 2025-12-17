import { createContext, useContext } from "react";

const defaultAuthValue = {
  isAuth: false,
  isLoggedIn: false,
  loading: true,
  user: null,
  login: () => {},
  logout: () => {},
  refreshProfile: async () => false,
};

export const AuthContext = createContext(defaultAuthValue);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn("useAuth must be used within an AuthProvider");
    return defaultAuthValue;
  }
  return context;
};
