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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const categories = useMemo(() => {
    const found = new Set();
    blogs.forEach((blog) => {
      const c = blog.category?.trim().toLowerCase();
      if (allowedCategories.includes(c)) found.add(c);
    });
    return Array.from(found);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!selectedCategory) return blogs;
    return blogs.filter(
      (blog) => blog.category?.toLowerCase() === selectedCategory.toLowerCase()
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
    <div style={{ padding: "0 20px" }}>
      {/* HERO */}
      <section style={heroSection}>
        <p style={heroTag}>BLOG PLATFORM</p>

        <h1 style={heroHeading}>
          Thoughtfully written posts, with space for your voice too
        </h1>

        <p style={heroSub}>
          A curated collection of articles from the admin desk — with
          opportunities for readers to get featured.
        </p>
      </section>

      {/* BLOG LIST */}
      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : blogs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No blogs have been published yet.</p>
      ) : (
        <>
          {renderFilters()}

          {filteredBlogs.length === 0 ? (
            <p style={{ marginTop: 24, textAlign: "center" }}>
              No blogs found in this category.
            </p>
          ) : (
            <div style={gridStyle}>
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </>
      )}

      <SubscribeBox />

      {/* FOOTER CTA */}
      <footer style={footerCta}>
        <h3 style={{ marginBottom: 8, fontSize: "1.6rem", fontWeight: 700 }}>
          Want to share your ideas with the world?
        </h3>
        <p style={{ color: "#e5e7eb", fontSize: "1.1rem" }}>
          Connect with me at{" "}
          <Link to="/share-ideas" style={emailLink}>
            sinharohit96690@gmail.com
          </Link>
        </p>
      </footer>
    </div>
  );
};



const heroSection = {
  textAlign: "center",
  marginBottom: "48px",
  marginTop: "20px",
};

const heroTag = {
  letterSpacing: 5,
  color: "#6b7280",
  fontSize: "0.8rem",
};

const heroHeading = {
  fontSize: "2.8rem",
  marginTop: "10px",
  marginBottom: "10px",
  lineHeight: 1.2,
};

const heroSub = {
  color: "#4b5563",
  fontSize: "1.05rem",
  maxWidth: "520px",
  margin: "0 auto",
};

const filterBar = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "12px",
  marginBottom: 24,
};

const filterButtonStyle = {
  borderRadius: 999,
  border: "1px solid #d1d5db",
  padding: "8px 20px",
  fontSize: 14,
  background: "#fff",
  color: "#111827",
  cursor: "pointer",
  transition: "all 0.25s ease",
};

const activeFilterButtonStyle = {
  background: "#111827",
  color: "#fff",
  borderColor: "#111827",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "28px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const footerCta = {
  marginTop: 70,
  padding: "40px 24px",
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
