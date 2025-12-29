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
    const status = error?.response?.status;
    const message = error?.response?.data?.message?.toLowerCase() || "";

    // Logout ONLY when token is actually invalid
    const shouldLogout =
      status === 401 &&
      (
        message.includes("jwt malformed") ||
        message.includes("invalid token") ||
        message.includes("token expired") ||
        message.includes("unauthorized")
      );

    if (shouldLogout) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/signup")
      ) {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export { servicesAxiosInstance };