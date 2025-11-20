import { useEffect, useState, useCallback } from "react";
import api from "../../../services/api";

export default function PendingComments() {
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

  const loadPendingComments = useCallback(async () => {
    if (!selectedBlog) return;

    try {
      const res = await api.get(
        `/admin/comments/${selectedBlog}/pending`
      );
      setComments(res.data.comments || []);
    } catch (err) {
      console.error(err);
    }
  }, [selectedBlog]);

  const handleBlogChange = useCallback((e) => {
    setSelectedBlog(e.target.value);
  }, []);

  const handleModerate = useCallback(
    async (commentId, status) => {
      try {
        await api.put("/admin/comments/moderate", {
          commentId,
          status,
        });
        await loadPendingComments();
      } catch (err) {
        console.error(err);
      }
    },
    [loadPendingComments]
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
        await loadPendingComments();
      }
    };
    run();

    return () => {
      ignore = true;
    };
  }, [loadPendingComments]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Pending Comments</h2>

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

      {comments.length === 0 ? (
        <p>No pending comments.</p>
      ) : (
        comments.map((c) => (
          <div
            key={c._id}
            style={{
              padding: 12,
              background: "#fafafa",
              marginBottom: 12,
              borderRadius: 6,
            }}
          >
            <strong>{c.userId}</strong>
            <p>{c.comment}</p>

            <small style={{ color: "gray" }}>
              {new Date(c.createdAt).toLocaleString()}
            </small>

            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => handleModerate(c._id, "approved")}
                style={{ marginRight: 10 }}
              >
                Approve
              </button>

              <button
                onClick={() => handleModerate(c._id, "rejected")}
                style={{ marginRight: 10 }}
              >
                Reject
              </button>

              <button onClick={() => handleModerate(c._id, "deleted")}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
