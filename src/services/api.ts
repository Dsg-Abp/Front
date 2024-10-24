import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://back-production-f64e.up.railway.app/", //"http://localhost:3202/"

  headers: {
    "Content-Type": "application/json",
  },
});
+api.interceptors.request.use(
  (config) => {
    

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
