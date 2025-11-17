import { Navigate, useLocation } from "react-router-dom";
import useAdminAuth from "../hooks/useAdminAuth";

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAdminAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
