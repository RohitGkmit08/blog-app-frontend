import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBlogById,
  getApprovedComments,
} from "../../../services/blogService";

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ user: "", comment: "" });
  const [message, setMessage] = useState("");

  // Load Blog + Comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog
        const blogRes = await getBlogById(id);
        setBlog(blogRes.blog);

        // Fetch approved comments
        const commentsRes = await getApprovedComments(id);
        setComments(commentsRes.comments || []);
      } catch (err) {
        console.error("Error loading blog or comments:", err);
      }
    };

    fetchData();
  }, [id]);

  // Submit comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId: id,
          userId: form.user || "Guest",
          comment: form.comment,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Comment submitted for review.");
        setForm({ user: "", comment: "" });
      } else {
        setMessage("Failed: " + data.message);
      }
    } catch (err) {
      console.error("Comment submit error:", err);
      setMessage("Error submitting comment.");
    }
  };

  if (!blog) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      
      <h1>{blog.title}</h1>
      <h3>{blog.subTitle}</h3>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          style={{ width: "100%", maxWidth: 600, marginBottom: 20 }}
        />
      )}

      <p>{blog.description}</p>

      <p><strong>Category:</strong> {blog.category}</p>
      <p><strong>Author:</strong> {blog.authorName}</p>
      <p><strong>Published:</strong> {blog.publishedAt?.substring(0, 10)}</p>

      <hr />

     
      <h2>Comments</h2>

      {comments.length === 0 && <p>No approved comments yet.</p>}

      {comments.map((c) => (
        <div
          key={c._id}
          style={{
            padding: 10,
            border: "1px solid #ddd",
            marginBottom: 10,
            borderRadius: 4,
          }}
        >
          <strong>{c.userId}</strong>
          <p>{c.comment}</p>
          <small>{new Date(c.createdAt).toLocaleString()}</small>
        </div>
      ))}

      <hr />

      {/* Add Comment */}
      <h3>Add Comment</h3>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Your name"
          value={form.user}
          onChange={(e) => setForm({ ...form, user: e.target.value })}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <textarea
          placeholder="Your comment"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogDetails;
