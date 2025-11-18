import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// ADMIN — blog operations
export const createBlog = async (formData, token) => {
  const res = await API.post("/api/admin/blogs", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateBlog = async (id, formData, token) => {
  const res = await API.put(`/api/admin/blogs/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteBlog = async (id, token) => {
  const res = await API.delete(`/api/admin/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ADMIN — comment moderation
export const getCommentsByStatus = async (blogId, status, token) => {
  const res = await API.get(`/api/admin/blogs/comments/${blogId}/${status}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const moderateComment = async (payload, token) => {
  const res = await API.post("/api/admin/blogs/comments/moderate", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
