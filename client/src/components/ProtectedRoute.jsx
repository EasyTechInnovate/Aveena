import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!isAuth) return <Navigate to="/" replace />;

  // Check if profile is complete - redirect to account page if not complete
  // Allow access to /account page even if profile is incomplete
  if (user && !user.isProfileComplete && location.pathname !== "/account") {
    return <Navigate to="/account" replace />;
  }

  return children;
};

export default ProtectedRoute;
