import axios from "axios";


const BASE_URL = import.meta.env.VITE_BASE_URL || "";

const cleanBase = BASE_URL.replace(/\/$/, "");

const api = axios.create({
  baseURL: `${cleanBase}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
