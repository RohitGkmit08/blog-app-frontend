import React from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminDashboard = () => {
  const { logout } = useAdminAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
