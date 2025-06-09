import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL = apiUrl;
const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
