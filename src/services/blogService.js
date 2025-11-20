<<<<<<< Updated upstream
=======
import api from "./api";

// Get all published blogs (public)
export const getAllBlogs = async () => {
  const res = await api.get("/blog/list");
  return res.data;
};

// Get single blog by slug (public)
export const getBlogBySlug = async (slug) => {
  const res = await api.get(`/blog/${slug}`);
  return res.data;
};

// Get approved comments for a blog
export const getApprovedComments = async (blogId) => {
  const res = await api.get(`/comments/${blogId}`);
  return res.data;
};
>>>>>>> Stashed changes
