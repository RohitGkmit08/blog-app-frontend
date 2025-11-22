import { Link } from "react-router-dom";

const cardStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: "18px",
  overflow: "hidden",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  cursor: "pointer",
};

const cardHoverStyle = {
  transform: "translateY(-4px)",
  boxShadow: "0 16px 38px rgba(15, 23, 42, 0.12)",
};

const imageWrapperStyle = {
  width: "100%",
  aspectRatio: "16 / 9", 
  overflow: "hidden",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export default function BlogCard({ blog }) {
  return (
    <article
      style={cardStyle}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, cardHoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, cardStyle);
      }}
    >
      {blog.image && (
        <div style={imageWrapperStyle}>
          <img src={blog.image} alt={blog.title} style={imageStyle} />
        </div>
      )}

      <div
        style={{
          padding: "20px",
          paddingTop: "18px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p style={{ textTransform: "uppercase", color: "#6b7280", fontSize: 13 }}>
          {blog.category}
        </p>

        <Link
          to={`/blog/${blog.slug || blog._id}`}
          style={{ color: "#111827", textDecoration: "none" }}
        >
          <h3 style={{ margin: "10px 0 12px", fontSize: "1.28rem", lineHeight: 1.3 }}>
            {blog.title}
          </h3>
        </Link>

        <p style={{ color: "#4b5563", flex: 1 }}>
          {blog.subTitle || blog.description?.slice(0, 120)}
        </p>

        <div style={{ marginTop: 16, fontSize: 14, color: "#6b7280" }}>
          <span>By {blog.authorName || "Admin"}</span>
          <span style={{ marginLeft: 12 }}>
            {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </article>
  );
}
