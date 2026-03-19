import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ADMIN_SESSION_FLAG = "isAdminSessionActive";

export const setAdminSession = () => {
  localStorage.setItem(ADMIN_SESSION_FLAG, "true");
};

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_SESSION_FLAG);
};

export const isAdminSessionActive = () => {
  return localStorage.getItem(ADMIN_SESSION_FLAG) === "true";
};

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth, user, loading } = useAuth();

  if (loading) return null;

  // Require normal auth (phone / google / password) so we have a valid JWT
  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  // Only allow admin or team members into the admin dashboard
  // const userType = user?.type;
  // if (userType !== "admin" && userType !== "team_member") {
  //   return <Navigate to="/" replace />;
  // }

  // Require an extra admin session gate (email/password on /admin-login)
  if (!isAdminSessionActive()) {
    return (
      <Navigate
        to="/admin-login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default AdminProtectedRoute;

