import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/admin/blogs");
      setBlogs(res.data.blogs || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Delete this blog?")) return;
      try {
        await api.delete(`/admin/blogs/${id}`);
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete blog.");
      }
    },
    []
  );

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Blogs</h2>
      <hr />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {blogs.length === 0 ? (
        <p>No blogs found</p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Title</th>
              <th style={th}>Category</th>
              <th style={th}>Status</th>
              <th style={th}>Created</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id}>
                <td style={td}>{b.title}</td>
                <td style={td}>{b.category}</td>
                <td style={td}>{b.isPublished ? "Published" : "Draft"}</td>
                <td style={td}>
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
                <td style={td}>
                  <Link to={`/admin/dashboard/blog/edit/${b._id}`}>Edit</Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(b._id)}
                    style={{ marginLeft: 12 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
  padding: "8px 12px",
};

const td = {
  borderBottom: "1px solid #f3f4f6",
  padding: "8px 12px",
};
