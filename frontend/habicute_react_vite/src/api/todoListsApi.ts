import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/";
const AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
