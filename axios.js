import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL // replace with your base URL
});

export default api;

