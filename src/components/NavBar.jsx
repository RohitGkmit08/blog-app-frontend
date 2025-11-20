import { Link } from "react-router-dom";

const navStyle = {
  width: "100%",
  maxWidth: "100%",
  padding: "12px 24px",
  borderBottom: "1px solid rgb(229,231,235)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "rgba(255,255,255)",
  position: "sticky",
  top: 0,
  boxSizing: "border-box",
  overflowX: "hidden"
};


const brandStyle = {
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#0f172a",
  textDecoration: "none",
  letterSpacing: "0.5px",
  display: "flex",
  alignItems: "center",
};

const linkRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",                     
};

const pillButton = {
  padding: "8px 20px",
  borderRadius: "999px",
  border: "1px solid #cbd5e1",
  textDecoration: "none",
  fontWeight: 600,
  color: "#0f172a",
  transition: "0.2s ease",
  background: "#fff",
};

const primaryButton = {
  ...pillButton,
  background: "#0f172a",
  color: "#fff",
  border: "1px solid #0f172a",
};

export default function NavBar() {
  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>
        BlogApp
      </Link>

      <div style={linkRow}>
        <Link to="/admin/login" style={primaryButton}>
          Login
        </Link>
      </div>
    </nav>
  );
}
