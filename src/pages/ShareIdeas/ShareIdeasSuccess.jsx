import { Link } from "react-router-dom";

export default function ShareIdeasSuccess() {
  return (
    <section style={wrapper}>
      <div style={card}>
        <div style={icon}>🎉</div>
        <h1 style={heading}>Submission Received!</h1>
        <p style={bodyText}>
          Thanks for sharing your ideas. We’ll review your article and get back
          to you soon at{" "}
          <strong style={{ color: "#111827" }}>
            sinharohit96690@gmail.com
          </strong>
          .
        </p>
        <div style={actions}>
          <Link to="/" style={{ ...button, background: "#111827", color: "#fff" }}>
            Back to Home
          </Link>
          <Link to="/share-ideas" style={secondaryButton}>
            Submit another article
          </Link>
        </div>
      </div>
    </section>
  );
}

const wrapper = {
  minHeight: "100vh",
  padding: "80px 16px",
  background: "#f3f4f6", 
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const card = {
  maxWidth: 560,
  width: "100%",
  background: "#ffffff",
  borderRadius: 24,
  padding: 40,
  textAlign: "center",
  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
};

const icon = {
  fontSize: "3rem",
  marginBottom: 16,
  color: "#111827", 
};

const heading = {
  fontSize: "2rem",
  marginBottom: 12,
  color: "#111827",
};

const bodyText = {
  color: "#ffff00", 
  fontSize: "1.05rem",
  lineHeight: 1.7,
  marginBottom: 32,
};

const actions = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const buttonBase = {
  display: "inline-block",
  padding: "14px 20px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 15,
};

const button = {
  ...buttonBase,
  background: "#111827",
  color: "#ffffff",
};

const secondaryButton = {
  ...buttonBase,
  border: "1px solid #d1d5db",
  background: "#ffffff",
  color: "#111827",
};
