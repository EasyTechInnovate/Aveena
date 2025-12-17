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

servicesAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
        window.location.href = "/";
      }
    }
    
    if (error?.response?.status === 500 && 
        error?.response?.data?.message?.toLowerCase().includes('jwt malformed')) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export { servicesAxiosInstance };
