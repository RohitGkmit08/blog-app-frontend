import api from "./api";

export const getAllBlogs = async () => {
  const res = await api.get("/blogs");
  return res.data;
};

export const getBlogById = async (id) => {
  const res = await api.get(`/blogs/${id}`);
  return res.data;
};

export const getApprovedComments = async (id) => {
  const res = await api.get(`/blogs/${id}/comments`);
  return res.data;
};
