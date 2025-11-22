import { Link } from "react-router-dom";

export default function ShareIdeasSuccess() {
  return (
    <section style={wrapper}>
      <div style={card}>
        <div style={icon}>🎉</div>

        <h1 style={heading}>Submission Received</h1>

        <p style={bodyText}>
          Thanks for sharing your ideas. Your article has been received and will
          be reviewed shortly. You’ll hear from us at{" "}
          <strong style={{ color: "#0f172a" }}>
            sinharohit96690@gmail.com
          </strong>
          .
        </p>

        <div style={actions}>
          <Link
            to="/"
            style={{
              ...button,
              background: "#0f172a",
              color: "#fff",
              border: "1px solid #0f172a",
            }}
          >
            Back to Home
          </Link>

          <Link
            to="/share-ideas"
            style={{
              ...secondaryButton,
            }}
          >
            Submit another article
          </Link>
        </div>
      </div>
    </section>
  );
}

const wrapper = {
  minHeight: "100vh",
  padding: "70px 20px",
  background: "#f5f6f7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const card = {
  maxWidth: 520,
  width: "100%",
  background: "#ffffff",
  borderRadius: 20,
  padding: "48px 36px",
  textAlign: "center",
  boxShadow: "0 18px 55px rgba(0,0,0,0.08)",
};

const icon = {
  fontSize: "3.2rem",
  marginBottom: 20,
};

const heading = {
  fontSize: "1.9rem",
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: 16,
};

const bodyText = {
  fontSize: "1.05rem",
  lineHeight: 1.7,
  color: "#475569",
  marginBottom: 36,
};

const actions = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const buttonBase = {
  display: "block",
  width: "100%",
  padding: "14px 20px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 15,
  transition: "0.2s ease",
};

const button = {
  ...buttonBase,
};

const secondaryButton = {
  ...buttonBase,
  background: "#ffffff",
  color: "#0f172a",
  border: "1px solid #d1d5db",
};
