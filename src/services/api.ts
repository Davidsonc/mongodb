import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333", // Altere para a URL da sua API
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export default api;
