import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAdminAuth } from "../context/useAdminAuth";

const shellStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "16px", 
  overflowX: "hidden", 
};

const boardStyle = {
  display: "flex",
  width: "100%",
  maxWidth: "1000px", 
  margin: "0 auto",
  borderRadius: 24,
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 40px 80px rgba(15, 23, 42, 0.12)",
  border: "1px solid #e2e8f0",
  minHeight: "80vh",
};

const sidebarStyle = {
  width: 240, 
  background: "linear-gradient(180deg, #0f172a, #1e293b)",
  color: "#e2e8f0",
  padding: "24px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 18,
};

const linkStyle = {
  color: "#e2e8f0",
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 500,
};

const linkActive = {
  background: "rgba(255,255,255,0.12)",
};

const contentStyle = {
  flex: 1,
  padding: "24px 28px", 
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  overflowX: "hidden", 
};

export default function DashboardLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogoutToUserMode = useCallback(() => {
  logout(); // clears token
  navigate("/", { replace: true }); // go to homepage 
}, [logout, navigate]);



  return (
    <div style={shellStyle}>
      <div style={boardStyle}>
        <div style={sidebarStyle}>
          <div>
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: 4,
                fontSize: 12,
                margin: 0,
                color: "#94a3b8",
              }}
            >
              Control
            </p>
            <h2 style={{ marginTop: 6, fontSize: "1.4rem" }}>Admin Panel</h2>
          </div>

          <NavLink
            to="/admin/dashboard"
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? linkActive : {}),
            })}
          >
            Dashboard Home
          </NavLink>
          <NavLink
            to="/admin/dashboard/blogs"
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? linkActive : {}),
            })}
          >
            All Blogs
          </NavLink>
          <NavLink
            to="/admin/dashboard/blog/create"
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? linkActive : {}),
            })}
          >
            Create Blog
          </NavLink>

          <div style={{ marginTop: 10 }}>
            <p
              style={{
                fontSize: 12,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 6,
              }}
            >
              Comments
            </p>
            <NavLink
              to="/admin/dashboard/comments/pending"
              style={({ isActive }) => ({
                ...linkStyle,
                ...(isActive ? linkActive : {}),
              })}
            >
              Pending
            </NavLink>
            <NavLink
              to="/admin/dashboard/comments/approved"
              style={({ isActive }) => ({
                ...linkStyle,
                ...(isActive ? linkActive : {}),
              })}
            >
              Approved
            </NavLink>
            <NavLink
              to="/admin/dashboard/comments/rejected"
              style={({ isActive }) => ({
                ...linkStyle,
                ...(isActive ? linkActive : {}),
              })}
            >
              Rejected
            </NavLink>
          </div>

          <NavLink
            to="/admin/dashboard/subscribers"
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? linkActive : {}),
            })}
          >
            Subscribers
          </NavLink>
        </div>

        <div style={contentStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <button
              type="button"
              onClick={handleLogoutToUserMode}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid #0f172a",
                background: "#0f172a",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(15, 23, 42, 0.15)",
              }}
            >
              Logout and user mode
            </button>
          </div>

          <div
            style={{
              flex: 1,
              background: "#f8fafc",
              borderRadius: 20,
              padding: 20,
              border: "1px solid #e2e8f0",
              overflowX: "hidden",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
