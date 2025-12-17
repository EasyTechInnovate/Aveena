import axios from "axios";

export const baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const servicesAxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Request interceptor (attach access token)
servicesAxiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    const token = localStorage.getItem("accessToken");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (handle 401 errors and JWT malformed errors)
servicesAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error?.response?.status === 401) {
      // Clear tokens and redirect to home
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Only redirect if not already on home/login page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
        window.location.href = "/";
      }
    }
    
    // Handle 500 errors with "jwt malformed" message - clear invalid token
    if (error?.response?.status === 500 && 
        error?.response?.data?.message?.toLowerCase().includes('jwt malformed')) {
      console.warn("Invalid JWT token detected, clearing authentication");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // Only redirect if not already on home/login page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export { servicesAxiosInstance };
