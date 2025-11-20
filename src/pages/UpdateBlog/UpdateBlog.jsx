import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { slugifyInput } from "../../utils/slug";

const initialState = {
  title: "",
  subTitle: "",
  description: "",
  slug: "",
  category: "",
  authorName: "",
  isPublished: false,
  publishedAt: "",
};

export default function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [slugDirty, setSlugDirty] = useState(true);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const formattedDate = useMemo(() => {
    if (!form.publishedAt) return "";
    return new Date(form.publishedAt).toISOString().slice(0, 16);
  }, [form.publishedAt]);

  const loadBlog = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/blogs/${id}`);
      setForm({
        title: res.data.blog.title,
        subTitle: res.data.blog.subTitle,
        description: res.data.blog.description,
        slug: res.data.blog.slug,
        category: res.data.blog.category,
        authorName: res.data.blog.authorName,
        isPublished: res.data.blog.isPublished,
        publishedAt: res.data.blog.publishedAt,
      });
      setSlugDirty(true);
    } catch (err) {
      console.error(err);
      setStatus("Failed to load blog.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadBlog();
  }, [loadBlog]);

  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugDirty ? prev.slug : slugifyInput(value),
    }));
  };

  const handleFieldChange = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSlugChange = (value) => {
    setForm((prev) => ({ ...prev, slug: slugifyInput(value) }));
    setSlugDirty(true);
  };

  const regenerateSlug = () => {
    setForm((prev) => ({ ...prev, slug: slugifyInput(prev.title) }));
    setSlugDirty(false);
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setStatus("");

      const payload = {
        ...form,
        publishedAt: form.isPublished
          ? form.publishedAt || new Date().toISOString()
          : null,
      };

      const data = new FormData();
      data.append("blog", JSON.stringify(payload));
      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await api.put(`/admin/blogs/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus(res.data.message || "Blog updated.");
      if (res.data.success) {
        navigate("/admin/dashboard/blogs");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response?.data?.message || "Failed to update blog.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading blog...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 20 }}>Update Blog</h2>

      <div style={{ display: "grid", gap: 20 }}>
        <label>
          <span>Title</span>
          <input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            style={inputStyle}
          />
        </label>

        <label>
          <span>Sub Title</span>
          <input
            value={form.subTitle}
            onChange={handleFieldChange("subTitle")}
            style={inputStyle}
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            value={form.description}
            onChange={handleFieldChange("description")}
            rows={6}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </label>

        <label>
          <span>Slug</span>
          <input
            value={form.slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            style={inputStyle}
          />
          <button
            type="button"
            onClick={regenerateSlug}
            style={{
              marginTop: 6,
              fontSize: 13,
              border: "none",
              background: "transparent",
              color: "#2563eb",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Regenerate from title
          </button>
        </label>

        <label>
          <span>Category</span>
          <input
            value={form.category}
            onChange={handleFieldChange("category")}
            style={inputStyle}
          />
        </label>

        <label>
          <span>Author Name</span>
          <input
            value={form.authorName}
            onChange={handleFieldChange("authorName")}
            style={inputStyle}
          />
        </label>

        <label>
          <span>Publish Date / Time</span>
          <input
            type="datetime-local"
            value={formattedDate}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                publishedAt: e.target.value ? new Date(e.target.value).toISOString() : "",
              }))
            }
            style={inputStyle}
            disabled={!form.isPublished}
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={handleFieldChange("isPublished")}
          />
          <span>Published</span>
        </label>

        <label>
          <span>Thumbnail Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {!imageFile && (
            <p style={{ fontSize: 14, color: "#6b7280", marginTop: 6 }}>
              Current image will be kept if no file is selected.
            </p>
          )}
        </label>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          style={buttonStyle}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button type="button" onClick={() => navigate(-1)} style={secondaryButton}>
          Cancel
        </button>
      </div>

      {status && <p style={{ marginTop: 16 }}>{status}</p>}
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginTop: 6,
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
};

const buttonStyle = {
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 16px",
  cursor: "pointer",
};

const secondaryButton = {
  ...buttonStyle,
  background: "#e5e7eb",
  color: "#111827",
};