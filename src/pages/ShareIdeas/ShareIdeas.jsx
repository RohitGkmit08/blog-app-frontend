import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const initialState = {
  title: "",
  subTitle: "",
  category: "",
  description: "",
  authorName: "",
  socialLinks: "",
  contactEmail: "",
};

export default function ShareIdeas() {
  const [form, setForm] = useState(initialState);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (featuredImage) {
        data.append("featuredImage", featuredImage);
      }

      await api.post("/submissions/guest", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm(initialState);
      setFeaturedImage(null);
      navigate("/share-ideas/success");
    } catch (err) {
      console.error("Share ideas submit error:", err);
      alert(
        err.response?.data?.message ||
          "Failed to send submission. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={pageWrapper}>
      <div style={card}>
        <div style={intro}>
          <p style={eyebrow}>Guest Submissions</p>
          <h1 style={title}>Want to share your ideas with the world?</h1>
          <p style={subtitle}>
            Fill out the form below with your article details. We’ll review your
            submission and get back to you at{" "}
            <strong>sinharohit96690@gmail.com</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={formGrid}>
          <label style={label}>
            Title *
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              required
              style={input}
              placeholder="Compelling headline"
            />
          </label>

          <label style={label}>
            Subtitle
            <input
              type="text"
              value={form.subTitle}
              onChange={handleChange("subTitle")}
              style={input}
              placeholder="Optional supporting line"
            />
          </label>

          <label style={label}>
            Category *
            <input
              type="text"
              value={form.category}
              onChange={handleChange("category")}
              required
              style={input}
              placeholder="Tech, Travel, Opinion..."
            />
          </label>

          <label style={{ ...label, gridColumn: "1 / -1" }}>
            Description / Full Content *
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              required
              rows={6}
              style={textarea}
              placeholder="Paste your full article or outline..."
            />
          </label>

          <label style={label}>
            Author Name *
            <input
              type="text"
              value={form.authorName}
              onChange={handleChange("authorName")}
              required
              style={input}
              placeholder="How should we credit you?"
            />
          </label>

  <label style={label}>
            Contact Email *
            <input
              type="email"
              value={form.contactEmail}
              onChange={handleChange("contactEmail")}
              required
              style={input}
              placeholder="Where we can reach you"
            />
          </label>

          <label style={{ ...label, gridColumn: "1 / -1" }}>
            Social Links
            <textarea
              value={form.socialLinks}
              onChange={handleChange("socialLinks")}
              rows={3}
              style={textarea}
              placeholder="Portfolio, LinkedIn, Instagram, etc."
            />
          </label>

          <label style={label}>
            Featured Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
              style={fileInput}
            />
            <span style={helperText}>
              Optional: attach the image you'd like featured.
            </span>
          </label>

          <button type="submit" style={submitButton} disabled={submitting}>
            {submitting ? "Sending..." : "Send Submission"}
          </button>

        </form>
      </div>
    </section>
  );
}

const pageWrapper = {
  padding: "60px 16px 90px",
  background: "#fff",
  minHeight: "100vh",
};

const card = {
  maxWidth: 960,
  margin: "0 auto",
  background: "#111827",
  borderRadius: 24,
  padding: 40,
  boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
};

const intro = {
  marginBottom: 32,
  textAlign: "center",
};

const eyebrow = {
  textTransform: "uppercase",
  letterSpacing: 6,
  color: "#fbbf24",
  fontSize: 12,
  marginBottom: 12,
};

const title = {
  fontSize: "2.25rem",
  color: "#fff",
  margin: 0,
};

const subtitle = {
  color: "#d1d5db",
  fontSize: "1.05rem",
  lineHeight: 1.6,
  marginTop: 12,
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 20,
};

const label = {
  fontSize: 14,
  fontWeight: 600,
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const baseInput = {
  borderRadius: 12,
  border: "1px solid #374151",
  padding: "12px 14px",
  fontSize: 15,
  color: "#fff",
  background: "#1f2937",
};

const input = {
  ...baseInput,
};

const textarea = {
  ...baseInput,
  resize: "vertical",
};

const fileInput = {
  border: "1px dashed #4b5563",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 14,
  color: "#d1d5db",
  background: "#1f2937",
};

const helperText = {
  fontSize: 12,
  color: "#9ca3af",
};

const submitButton = {
  gridColumn: "1 / -1",
  marginTop: 10,
  background: "#fff",
  color: "#111827",
  border: "none",
  borderRadius: 999,
  padding: "14px 24px",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  transition: "0.2s",
};
