import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request (skip demo-token so backend isn't called with it)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token && token !== "demo-token") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 (expired token) - don't redirect when using demo mode
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const token = localStorage.getItem("auth_token");
    if (err.response?.status === 401 && token !== "demo-token") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const authService = {
  login: (email, password) => api.post("/login", { email, password }),
  logout: () => api.post("/logout"),
  me: () => api.get("/me"),
};

export const dashboardService = {
  getStats: () => api.get("/dashboard/stats"),
  getEnrollmentTrends: () => api.get("/dashboard/enrollment-trends"),
  getCourseDistribution: () => api.get("/dashboard/course-distribution"),
  getAttendancePatterns: () => api.get("/dashboard/attendance-patterns"),
};

export const studentService = {
  getAll: (page = 1) => api.get(`/students?page=${page}`),
};

export const courseService = {
  getAll: () => api.get("/courses"),
};

export default api;