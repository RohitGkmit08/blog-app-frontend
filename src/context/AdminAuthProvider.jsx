import { useState } from "react";
import AdminAuth from "./AdminAuthContext";

export default function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("adminToken") || null;
  });

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("adminToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
  };

  const isLoggedIn = Boolean(token);

  return (
    <AdminAuth.Provider value={{ token, login, logout, isLoggedIn }}>
      {children}
    </AdminAuth.Provider>
  );
}
