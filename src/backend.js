import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(async function (config) {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await apiClient.post(
          "/api/refresh-access",
          {},
          { withCredentials: true }
        );
        const newAccess = res.data.access;
        localStorage.setItem("access_token", newAccess);
        return apiClient(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
