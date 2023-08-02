import axios from "axios";

const api = axios.create({
  baseURL: "https://unifeed-server-production.up.railway.app/api", // Replace this with your desired base URL
  withCredentials: true,
});

export default api;
