import { useEffect, useState, useCallback } from "react";
import api from "../../../services/api";

export default function RejectedComments() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState("");
  const [comments, setComments] = useState([]);

  const loadBlogs = useCallback(async () => {
    try {
      const res = await api.get("/admin/blogs");
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadRejectedComments = useCallback(async () => {
    if (!selectedBlog) return;

    try {
      const res = await api.get(
        `/admin/comments/${selectedBlog}/rejected`
      );
      setComments(res.data.comments || []);
    } catch (err) {
      console.error(err);
    }
  }, [selectedBlog]);

  const handleBlogChange = useCallback((e) => {
    setSelectedBlog(e.target.value);
  }, []);

  const handleDelete = useCallback(
    async (commentId) => {
      try {
        await api.put("/admin/comments/moderate", {
          commentId,
          status: "deleted",
        });
        await loadRejectedComments();
      } catch (err) {
        console.error(err);
      }
    },
    [loadRejectedComments]
  );

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      if (!ignore) {
        await loadBlogs();
      }
    };

    run();
    return () => {
      ignore = true;
    };
  }, [loadBlogs]);

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      if (!ignore) {
        await loadRejectedComments();
      }
    };

    run();
    return () => {
      ignore = true;
    };
  }, [loadRejectedComments]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Rejected Comments</h2>

      <select
        value={selectedBlog}
        onChange={handleBlogChange}
        style={{ marginBottom: 20, padding: 6 }}
      >
        <option value="">Select Blog</option>
        {blogs.map((b) => (
          <option key={b._id} value={b._id}>
            {b.title}
          </option>
        ))}
      </select>

      <hr />

      {comments.map((c) => (
        <div
          key={c._id}
          style={{
            background: "#fff0f0",
            padding: 12,
            borderRadius: 6,
            marginBottom: 12,
          }}
        >
          <strong>{c.userId}</strong>
          <p>{c.comment}</p>

          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
