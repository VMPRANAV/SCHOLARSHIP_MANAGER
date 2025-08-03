import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authentication token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post("/auth/login", credentials);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify({
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
    }));
    return response.data;
  },
  
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post("/auth/register", userData);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify({
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
    }));
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export default api;
