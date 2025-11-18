import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// PUBLIC
export const getAllBlogs = async () => {
  const res = await API.get("/api/blogs");
  return res.data;
};

export const getBlogById = async (id) => {
  const res = await API.get(`/api/blogs/${id}`);
  return res.data;
};

export const getApprovedComments = async (id) => {
  const res = await API.get(`/api/blogs/${id}/comments`);
  return res.data;
};
