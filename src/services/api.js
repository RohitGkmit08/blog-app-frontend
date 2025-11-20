
import axios from "axios";


const RAW_BASE =
  import.meta.env.VITE_BASE_URL || "http://98.93.198.247:3000/api";


const BASE_URL = RAW_BASE.replace(/\/$/, "");

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
