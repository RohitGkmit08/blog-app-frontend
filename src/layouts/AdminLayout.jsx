import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: "260px",
          background: "#1e1e1e",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <NavLink to="/admin" className="admin-link">
            Dashboard Home
          </NavLink>

          <NavLink to="/admin/pending-comments" className="admin-link">
            Pending Comments
          </NavLink>

          <NavLink to="/admin/approved-comments" className="admin-link">
            Approved Comments
          </NavLink>

          <NavLink to="/admin/rejected-comments" className="admin-link">
            Rejected Comments
          </NavLink>

          {/* BLOG SECTION */}
          <hr style={{ margin: "20px 0", opacity: 0.3 }} />

          <NavLink to="/admin/blogs" className="admin-link">
            All Blogs
          </NavLink>

          <NavLink to="/admin/create-blog" className="admin-link">
            Create Blog
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </main>
    </div>
  );
}
