import axios from "axios";

const authHeader = localStorage.getItem("auth"); 

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Basic ${authHeader}`,
  },
});

export default api;
