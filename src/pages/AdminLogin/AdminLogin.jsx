import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/useAdminAuth";
import api from "../../services/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAdminAuth();

  
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/api/admin/login", { email, password });


      if (res.data?.token) {
        login(res.data.token);  // save token in context + localStorage
        navigate(from, { replace: true });
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={page}>
      <div style={panel}>
        <div style={brandPill}>Admin Access</div>
        <h2 style={heading}>Welcome back</h2>
        <p style={subheading}>Sign in to manage blogs, comments, and subscribers.</p>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          {error && <p style={errorStyle}>{error}</p>}

          <label style={labelStyle}>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="admin@example.com"
              required
            />
          </label>

          <label style={{ ...labelStyle, marginTop: 16 }}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="••••••••"
              required
            />
          </label>

          <button type="submit" style={submitButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f4f6fb, #e3e9ff)",
  padding: 20,
};

const panel = {
  width: "100%",
  maxWidth: 420,
  background: "#fff",
  borderRadius: 24,
  padding: "40px 36px",
  boxShadow: "0 35px 80px rgba(15, 23, 42, 0.12)",
  border: "1px solid #eef2ff",
};

const brandPill = {
  display: "inline-flex",
  padding: "6px 14px",
  borderRadius: 999,
  background: "#eef2ff",
  color: "#4338ca",
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: 1,
  textTransform: "uppercase",
};

const heading = {
  marginTop: 20,
  fontSize: "1.85rem",
  marginBottom: 6,
  color: "#0f172a",
};

const subheading = {
  color: "#6b7280",
  margin: 0,
};

const labelStyle = {
  display: "block",
  color: "#374151",
  fontWeight: 500,
  fontSize: 14,
  marginBottom: 6,
};

const inputStyle = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid #d0d7f8",
  padding: "12px 14px",
  fontSize: 15,
  outline: "none",
  transition: "border 0.2s ease",
};

const submitButton = {
  marginTop: 28,
  width: "100%",
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "#111827",
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};

const errorStyle = {
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "10px 12px",
  borderRadius: 12,
  marginBottom: 16,
};
