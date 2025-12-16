import axios from "axios";

export const baseURL =
  import.meta.env.VITE_API_URL 

if (!baseURL) {
  throw new Error("VITE_API_URL environment variable is not defined.");
}

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

// ✅ Response interceptor (refresh token flow)
servicesAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          `${baseURL}/auth/refresh-token`,
          { refreshToken }
        );

        const { accessToken } = response.data.data;

        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers =
          originalRequest.headers || {};

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return servicesAxiosInstance(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.clear();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export { servicesAxiosInstance };
