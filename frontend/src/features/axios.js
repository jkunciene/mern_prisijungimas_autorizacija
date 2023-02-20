import axios from "axios";
import { getUser } from "./localStorage";

// Create axios instance.
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Accept: "application/json" },
});

axiosInstance.interceptors.request.use(function (config) {
  const user = getUser();

  if (user && user.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${user.token}`,
    };
  }
  return config;
});

export default axiosInstance;
