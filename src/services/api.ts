import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3202",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.headers["Sec-Ch-Ua"] =
      '"Not A(Brand";v="99", "Samsung Internet";v="25.0", "Chromium";v="121"';
    config.headers["Sec-Ch-Ua-Mobile"] = "?1";
    config.headers["Sec-Ch-Ua-Platform"] = '"Android"';
    config.headers["User-Agent"] =
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36";

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
