import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import SubscribeBox from "../../components/SubscribeBox";
import BlogCard from "../../components/BlogCard";
import Loader from "../../components/Loader";
import { getAllBlogs } from "../../services/blogService";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const allowedCategories = ["sport", "tech", "entertainment", "art"];

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllBlogs();
      setBlogs(res.blogs || []);
    } catch (err) {
      setError("Failed to load blogs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  // Only categories that exist in dropdown list
  const categories = useMemo(() => {
    const found = new Set();

    blogs.forEach((blog) => {
      const c = blog.category?.trim().toLowerCase();
      if (allowedCategories.includes(c)) {
        found.add(c);
      }
    });

    return Array.from(found);
  }, [blogs]);

  // Filtering logic 
  const filteredBlogs = useMemo(() => {
    if (!selectedCategory) return blogs;

    return blogs.filter(
      (blog) =>
        blog.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [blogs, selectedCategory]);

  const renderFilters = () => (
    <div style={filterBar}>
      <button
        type="button"
        onClick={() => setSelectedCategory("")}
        style={{
          ...filterButtonStyle,
          ...(selectedCategory === "" ? activeFilterButtonStyle : {}),
        }}
      >
        All
      </button>

      {categories.map((category) => {
        const isActive =
          selectedCategory.toLowerCase() === category.toLowerCase();

        return (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            style={{
              ...filterButtonStyle,
              ...(isActive ? activeFilterButtonStyle : {}),
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        );
      })}
    </div>
  );

  return (
    <div>
      <section style={{ textAlign: "center", marginBottom: "40px" }}>
        <p style={{ letterSpacing: 5, color: "#6b7280" }}>BLOG PLATFORM</p>
        <h1 style={{ fontSize: "2.5rem", marginTop: 10 }}>
          Fresh stories from our writers
        </h1>
        <p style={{ color: "#4b5563", marginTop: 12 }}>
          Read the latest published articles from the admin desk.
        </p>
      </section>

      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : blogs.length === 0 ? (
        <p>No blogs have been published yet.</p>
      ) : (
        <>
          {renderFilters()}
          {filteredBlogs.length === 0 ? (
            <p style={{ marginTop: 24 }}>No blogs found in this category.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </>
      )}

      <SubscribeBox />

      <footer style={footerCta}>
        <h3 style={{ marginBottom: 8, fontSize: "1.5rem" }}>
          Want to share your ideas with the world?
        </h3>
        <p style={{ color: "#e5e7eb", fontSize: "1.05rem" }}>
          Connect with me at{" "}
          <Link to="/share-ideas" style={emailLink}>
            sinharohit96690@gmail.com
          </Link>
        </p>
      </footer>
    </div>
  );
};

const filterBar = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  marginBottom: 24,
};

const filterButtonStyle = {
  borderRadius: 999,
  border: "1px solid #d1d5db",
  padding: "8px 18px",
  fontSize: 14,
  background: "#fff",
  color: "#111827",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const activeFilterButtonStyle = {
  background: "#111827",
  color: "#fff",
  borderColor: "#111827",
};

const footerCta = {
  marginTop: 60,
  padding: "32px 24px",
  borderRadius: 20,
  background: "#111827",
  color: "#fff",
  textAlign: "center",
};

const emailLink = {
  color: "#fff",
  textDecoration: "underline",
  fontWeight: 600,
  opacity: 0.9,
};

export default Home;
