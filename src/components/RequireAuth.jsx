import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/useAdminAuth";

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAdminAuth();
  const location = useLocation();

  // Only protect admin dashboard routes
  const isAdminDashboardRoute = location.pathname.startsWith("/admin/dashboard");

  if (isAdminDashboardRoute && !isLoggedIn) {
    return <Navigate to="/" replace />;  
  }

  return children;
}
