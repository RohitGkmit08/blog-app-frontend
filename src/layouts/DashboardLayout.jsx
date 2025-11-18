import React from 'react'

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "240px",
          background: "#2f3542",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Admin Panel</h2>
        <ul>
          <li>Blogs</li>
          <li>Comments</li>
          <li>Subscribers</li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
};
export default DashboardLayout