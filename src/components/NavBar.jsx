import { Link } from "react-router-dom";

const navStyle = {
  width: "100%",
  padding: "14px 32px",
  borderBottom: "1px solid #e2e8f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#ffffffee",
  position: "sticky",
  top: 0,
  backdropFilter: "blur(8px)",
  zIndex: 50,
  boxSizing: "border-box",
};

const brandStyle = {
  fontSize: "1.4rem",
  fontWeight: 700,
  color: "#0f172a",
  textDecoration: "none",
  letterSpacing: "0.3px",
  display: "flex",
  alignItems: "center",
  transition: "0.2s ease",
};

const linkRow = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const pillButton = {
  padding: "8px 20px",
  borderRadius: "999px",
  border: "1px solid #cbd5e1",
  textDecoration: "none",
  fontWeight: 600,
  color: "#0f172a",
  background: "#fff",
  transition: "0.2s ease",
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
        DailyPost
      </Link>

      <div style={linkRow}>
        <Link
          to="/admin/login"
          style={primaryButton}
          onMouseEnter={e => {
            e.target.style.opacity = "0.85";
          }}
          onMouseLeave={e => {
            e.target.style.opacity = "1";
          }}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
