import { Routes, Route } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";

import PendingComments from "./Comments/PendingComments";
import ApprovedComments from "./Comments/ApprovedComments";
import RejectedComments from "./Comments/RejectedComments";

export default function AdminDashboard() {
  const { logout } = useAdminAuth();

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Dashboard Home */}
        <Route
          index
          element={
            <div>
              <h1>Admin Dashboard</h1>
              <button onClick={logout}>Logout</button>
            </div>
          }
        />

        {/* Comment Moderation Routes */}
        <Route path="comments/pending" element={<PendingComments />} />
        <Route path="comments/approved" element={<ApprovedComments />} />
        <Route path="comments/rejected" element={<RejectedComments />} />
      </Route>
    </Routes>
  );
}
