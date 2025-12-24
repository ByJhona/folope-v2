import axios, { AxiosInstance } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
