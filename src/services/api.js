import axios from "axios";

// Get base URL from environment, default to localhost
let BASE_URL = import.meta.env.VITE_BASE_URL
  ? import.meta.env.VITE_BASE_URL.replace(/\/$/, "")
  : "http://localhost:3000";

// Always ensure /api is at the end (but not duplicated)
// Remove any trailing /api first, then add it back
BASE_URL = BASE_URL.replace(/\/api\/?$/, "");
BASE_URL = `${BASE_URL}/api`;

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
