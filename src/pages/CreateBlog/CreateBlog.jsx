import { useState } from "react";
import api from "../../services/api";
import { useAdminAuth } from "../../context/useAdminAuth";
import { slugifyInput } from "../../utils/slug";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [slugDirty, setSlugDirty] = useState(false);
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState("");

  const { token } = useAdminAuth();
  const navigate = useNavigate();

  const categories = ["sports", "tech", "entertainment", "art"];

  const handleTitleChange = (value) => {
    setTitle(value);
    if (!slugDirty) {
      setSlug(slugifyInput(value));
    }
  };

  const handleSlugChange = (value) => {
    setSlug(slugifyInput(value));
    setSlugDirty(true);
  };

  const resetSlug = () => {
    const nextSlug = slugifyInput(title);
    setSlug(nextSlug);
    setSlugDirty(false);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (isPublish) => {
    if (!title || !description || !category || !authorName) {
      setStatus("Please fill all required fields.");
      return;
    }

    try {
      setStatus("Uploading...");

      const formData = new FormData();

      const blogData = {
        title,
        subTitle,
        description,
        slug,
        category,
        authorName,
        isPublished: isPublish,
        publishedAt: isPublish ? new Date() : null,
      };

      formData.append("blog", JSON.stringify(blogData));
      formData.append("image", imageFile);

      const res = await api.post("/admin/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus(res.data.message);

      // admin redirect
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 800);
    } catch (err) {
      setStatus("Failed to create blog.");
      console.log(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "840px",
        margin: "0 auto",
        padding: "20px",
        overflowX: "hidden",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Create Blog</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Title */}
        <div>
          <label>Title *</label>
          <input
            style={{ width: "100%" }}
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter blog title (required)"
            required
          />
        </div>

        
        <div>
          <label>Sub Title</label>
          <input
            style={{ width: "100%" }}
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="Enter sub title"
          />
        </div>

       
        <div style={{ gridColumn: "1 / span 2" }}>
          <label>Description *</label>
          <textarea
            style={{ width: "100%", height: "120px" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write blog description (required)"
            required
          />
        </div>

       
        <div>
          <label>Slug</label>
          <input
            style={{ width: "100%" }}
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="Auto-generated slug"
          />
          <button
            type="button"
            onClick={resetSlug}
            style={{
              marginTop: "8px",
              fontSize: "0.85rem",
              border: "none",
              background: "transparent",
              color: "#2563eb",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Regenerate from title
          </button>
        </div>

        
        <div>
          <label>Category *</label>
          <select
            style={{ width: "100%", padding: "8px" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

      
        <div>
          <label>Author Name *</label>
          <input
            style={{ width: "100%" }}
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter author name (required)"
            required
          />
        </div>

       
        <div>
          <label>Thumbnail Image</label>
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
        </div>

       
        {imagePreview && (
          <div style={{ gridColumn: "1 / span 2" }}>
            <p>Thumbnail Preview:</p>
            <img
              src={imagePreview}
              alt="thumbnail preview"
              style={{
                width: "240px",
                borderRadius: "6px",
                marginTop: "8px",
              }}
            />
          </div>
        )}
      </div>

      
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <button onClick={() => handleSubmit(true)}>Publish</button>
        <button onClick={() => handleSubmit(false)}>Save as Draft</button>
      </div>

      {status && <p style={{ marginTop: "20px" }}>{status}</p>}
    </div>
  );
}
