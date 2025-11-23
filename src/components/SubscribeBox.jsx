import { useState } from "react";
import api from "../services/api";

export default function SubscribeBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("Loading...");
    setStatusType("loading");

    try {
      await api.post("/subscribers/subscribe", { email });
      setStatus("Subscribed successfully!");
      setStatusType("success");
      setEmail("");
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 5000);
    } catch (error) {
      setStatus(error.response?.data?.message || "Subscription failed. Please try again.");
      setStatusType("error");
    }
  };

  const getStatusStyle = () => {
    if (statusType === "success") {
      return statusSuccessStyle;
    } else if (statusType === "error") {
      return statusErrorStyle;
    } else if (statusType === "loading") {
      return statusLoadingStyle;
    }
    return {};
  };

  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>Subscribe for Blog Updates</h3>
      <p style={subheadingStyle}>
        Get notified when new articles are published
      </p>

      <form onSubmit={handleSubscribe} style={formStyle}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          disabled={statusType === "loading"}
        />

        <button
          type="submit"
          style={{
            ...buttonStyle,
            ...(statusType === "loading" ? buttonDisabledStyle : {}),
          }}
          disabled={statusType === "loading"}
        >
          {statusType === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {status && (
        <div style={getStatusStyle()}>
          {statusType === "success" && (
            <span style={iconStyle}>✓</span>
          )}
          {statusType === "error" && (
            <span style={iconStyle}>✗</span>
          )}
          <span>{status}</span>
        </div>
      )}
    </div>
  );
}

// Styles
const containerStyle = {
  marginTop: "60px",
  marginBottom: "40px",
  padding: "32px 24px",
  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  maxWidth: "600px",
  marginLeft: "auto",
  marginRight: "auto",
};

const headingStyle = {
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "8px",
  textAlign: "center",
};

const subheadingStyle = {
  fontSize: "0.95rem",
  color: "#6b7280",
  marginBottom: "24px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const inputStyle = {
  flex: 1,
  minWidth: "200px",
  padding: "12px 16px",
  fontSize: "15px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  outline: "none",
  transition: "all 0.2s ease",
  background: "#fff",
};

const buttonStyle = {
  padding: "12px 24px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",
};

const buttonDisabledStyle = {
  opacity: 0.6,
  cursor: "not-allowed",
};

const statusSuccessStyle = {
  marginTop: "16px",
  padding: "12px 16px",
  background: "#d1fae5",
  color: "#065f46",
  borderRadius: "10px",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid #a7f3d0",
};

const statusErrorStyle = {
  marginTop: "16px",
  padding: "12px 16px",
  background: "#fee2e2",
  color: "#991b1b",
  borderRadius: "10px",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid #fecaca",
};

const statusLoadingStyle = {
  marginTop: "16px",
  padding: "12px 16px",
  background: "#dbeafe",
  color: "#1e40af",
  borderRadius: "10px",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const iconStyle = {
  fontSize: "16px",
  fontWeight: "bold",
};
