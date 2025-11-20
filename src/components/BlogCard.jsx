import { Link } from "react-router-dom";

const cardStyle = {
  border: "1px solid #e2e8f0",
  borderRadius: "18px",
  overflow: "hidden",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  maxWidth: 320,
  margin: "0 auto",
};

const imageStyle = {
  width: "100%",
  height: "190px",
  objectFit: "cover",
};

export default function BlogCard({ blog }) {
  return (
    <article style={cardStyle}>
      {blog.image && (
        <img src={blog.image} alt={blog.title} style={imageStyle} />
      )}

      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ textTransform: "uppercase", color: "#6b7280", fontSize: 13 }}>
          {blog.category}
        </p>

        <Link
          to={`/blog/${blog.slug || blog._id}`}
          style={{
            color: "#111827",
            textDecoration: "none",
          }}
        >
          <h3 style={{ margin: "8px 0 12px", fontSize: "1.25rem" }}>{blog.title}</h3>
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