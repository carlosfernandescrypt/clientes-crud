import axios from "axios";

const authHeader = localStorage.getItem("auth"); // Obtém as credenciais salvas

const api = axios.create({
  baseURL: "http://localhost:8080", // URL do back-end
  headers: {
    Authorization: `Basic ${authHeader}`,
  },
});

export default api;
