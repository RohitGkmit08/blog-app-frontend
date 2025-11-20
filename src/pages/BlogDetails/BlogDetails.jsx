

import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Loader";

const looksLikeObjectId = (value = "") => /^[a-f\d]{24}$/i.test(value);

export default function BlogDetails() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentStatus, setCommentStatus] = useState("");
  const blogId = blog?._id;

  const formattedDate = useMemo(() => {
    if (!blog?.publishedAt && !blog?.createdAt) return "";
    const value = blog.publishedAt || blog.createdAt;
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [blog]);

  const loadApprovedComments = useCallback(async (blogId) => {
    if (!blogId) {
      setComments([]);
      return;
    }
    try {
      // FIXED: correct backend route
      const res = await api.get(`/comments/${blogId}`);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  }, []);

  const loadBlog = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      // FIXED: correct backend route for fetching blog
      const res = await api.get(`/blog/${slug}`);

      setBlog(res.data.blog);
      await loadApprovedComments(res.data.blog?._id);
    } catch (err) {
      const token = localStorage.getItem("adminToken");
      const canUseAdminFallback = token && looksLikeObjectId(slug);

      // admin fallback (ID-based)
      if (canUseAdminFallback) {
        try {
          const adminRes = await api.get(`/admin/blogs/${slug}`);
          const fallbackBlog =
            adminRes.data.blog || adminRes.data.updatedBlog;

          setBlog(fallbackBlog);
          await loadApprovedComments(fallbackBlog?._id);
          return;
        } catch (adminErr) {
          console.error("Admin fetch failed:", adminErr);
          setError("Unable to load this blog.");
        }
      } else {
        setError(
          err.response?.status === 404
            ? "This blog is not available or has been unpublished."
            : "Unable to load this blog."
        );
      }

      console.error("Error loading blog:", err);
    } finally {
      setLoading(false);
    }
  }, [slug, loadApprovedComments]);

  const handleCommentSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!userComment.trim()) {
        setCommentStatus("Please enter a comment before submitting.");
        return;
      }
      if (!userEmail.trim()) {
        setCommentStatus("Please provide the email you subscribed with.");
        return;
      }
      if (!blogId) {
        setCommentStatus("Blog is still loading. Please wait a moment.");
        return;
      }

      try {
        // FIXED: correct backend route for adding comments
        await api.post(`/comments`, {
          blogId,
          userId: "AnonymousUser",
          comment: userComment,
          email: userEmail,
        });

        setCommentStatus("Comment submitted for review.");
        setUserComment("");
        setUserEmail("");
      } catch (err) {
        console.error("Error submitting comment:", err);
        setCommentStatus("Failed to submit comment. Please try again.");
      }
    },
    [blogId, userComment, userEmail]
  );

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      if (!ignore) {
        await loadBlog();
      }
    };

    run();

    return () => {
      ignore = true;
    };
  }, [loadBlog]);

  if (loading) {
    return (
      <div style={{ padding: "60px 0" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 720, margin: "80px auto", textAlign: "center" }}>
        <h2 style={{ marginBottom: 16 }}>{error}</h2>
        <p style={{ color: "#6b7280" }}>
          Please check the URL or return to the homepage to view other articles.
        </p>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <article style={pageStyle}>
      <div style={heroText}>
        <p style={eyebrow}>{blog.category}</p>
        <h1 style={titleStyle}>{blog.title}</h1>
        {blog.subTitle && <p style={subtitleStyle}>{blog.subTitle}</p>}

        <div style={metaRow}>
          <span>By {blog.authorName || "Admin"}</span>
          {formattedDate && <span>• {formattedDate}</span>}
        </div>
      </div>

      {blog.image && (
        <div style={imageWrapper}>
          <img src={blog.image} alt={blog.title} style={imageStyle} />
        </div>
      )}

      <section style={bodyStyle}>
        <p>{blog.description}</p>
      </section>

      {/* COMMENTS */}
      <section style={{ marginTop: 48 }}>
        <div style={sectionHeader}>
          <h2 style={{ margin: 0 }}>Comments</h2>
          <span style={{ color: "#6b7280" }}>
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </span>
        </div>

        {comments.length === 0 ? (
          <p style={{ color: "#6b7280", marginTop: 12 }}>
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
            {comments.map((c) => (
              <div key={c._id} style={commentCard}>
                <div style={commentMeta}>
                  <strong>{c.userId}</strong>
                  <span>{new Date(c.createdAt).toLocaleString()}</span>
                </div>
                <p style={{ marginTop: 8, color: "#1f2937" }}>
                  {c.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* COMMENT FORM */}
      <section style={formWrapper}>
        <h3 style={{ marginBottom: 12 }}>Leave a Comment</h3>
        {commentStatus && (
          <p style={{ color: "#2563eb", marginBottom: 12 }}>
            {commentStatus}
          </p>
        )}
        <form onSubmit={handleCommentSubmit}>
          <label style={labelStyle}>
            Subscribed email
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
            />
          </label>

          <textarea
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            style={textareaStyle}
          />
          <button type="submit" style={buttonStyle}>
            Submit Comment
          </button>
        </form>
      </section>
    </article>
  );
}

/* ------------------------ STYLES ------------------------ */

const pageStyle = {
  maxWidth: 860,
  margin: "0 auto",
  padding: "40px 24px 80px",
};

const heroText = {
  textAlign: "center",
  marginBottom: 32,
};

const eyebrow = {
  textTransform: "uppercase",
  letterSpacing: 4,
  color: "#6b7280",
  fontSize: 12,
  marginBottom: 12,
};

const titleStyle = {
  fontSize: "2.75rem",
  margin: "0 0 12px",
  lineHeight: 1.15,
};

const subtitleStyle = {
  fontSize: "1.25rem",
  color: "#4b5563",
  margin: 0,
};

const metaRow = {
  marginTop: 16,
  color: "#6b7280",
  fontSize: 14,
};

const imageWrapper = {
  borderRadius: 24,
  overflow: "hidden",
  boxShadow: "0 25px 50px rgba(15, 23, 42, 0.15)",
  marginBottom: 32,
};

const imageStyle = {
  width: "100%",
  display: "block",
  maxHeight: 520,
  objectFit: "cover",
};

const bodyStyle = {
  fontSize: "1.125rem",
  lineHeight: 1.8,
  color: "#1f2937",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const commentCard = {
  padding: 18,
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  background: "#fff",
  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
};

const commentMeta = {
  display: "flex",
  justifyContent: "space-between",
  color: "#6b7280",
  fontSize: 13,
};

const formWrapper = {
  marginTop: 40,
  borderTop: "1px solid #e5e7eb",
  paddingTop: 32,
};

const labelStyle = {
  display: "block",
  fontSize: 14,
  fontWeight: 500,
  color: "#111827",
  marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid #cbd5f5",
  padding: "10px 12px",
  fontSize: 15,
  marginBottom: 12,
};

const textareaStyle = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid #cbd5f5",
  padding: "12px 14px",
  fontSize: 16,
  marginBottom: 12,
  resize: "vertical",
};

const buttonStyle = {
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: 999,
  padding: "12px 24px",
  fontSize: 16,
  cursor: "pointer",
};

