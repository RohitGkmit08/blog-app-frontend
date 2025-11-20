import axios from "axios";


let BASE_URL =
  import.meta.env.VITE_BASE_URL?.trim() || "http://localhost:3000";


BASE_URL = BASE_URL.replace(/\/$/, "");      
BASE_URL = BASE_URL.replace(/\/api$/, "");   

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
