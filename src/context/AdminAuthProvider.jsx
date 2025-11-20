import { useState } from "react";
import { AdminAuthContext } from "./AdminAuthContext";

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  const isLoggedIn = !!token;

  const login = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  return (
    <AdminAuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
