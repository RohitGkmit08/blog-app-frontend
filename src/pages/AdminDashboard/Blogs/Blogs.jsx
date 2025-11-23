import { useState, useEffect, useCallback } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await api.get("/admin/blogs");

      if (res.data && Array.isArray(res.data.blogs)) {
        setBlogs(res.data.blogs);
      } else {
        setBlogs([]);
      }
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await api.delete(`/admin/blogs/${id}`);

        setBlogs((prev) => prev.filter((item) => item._id !== id));
      } catch (err){
        console.log(err)
      }
    },
    []
  );

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (loading) return <p>Loading...</p>;

  return (
    <div
      style={{
        overflowX: "hidden",
        padding: "20px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>All Blogs (Admin)</h2>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "600px", // prevents table from breaking small screens
            }}
          >
            <thead>
              <tr style={{ background: "#f2f2f2" }}>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td style={tdStyle}>{blog.title}</td>
                  <td style={tdStyle}>{blog.category}</td>
                  <td style={tdStyle}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </td>
                  <td style={tdStyle}>
                    <Link
                      to={`/admin/dashboard/blog/edit/${blog._id}`}
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Edit
                    </Link>

                    &nbsp;|&nbsp;

                    <button
                      type="button"
                      onClick={() => handleDelete(blog._id)}
                      style={{
                        color: "red",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* Table Styles */
const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
  borderBottom: "1px solid #ddd",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  wordWrap: "break-word",
  whiteSpace: "normal",
  maxWidth: "250px",
};
