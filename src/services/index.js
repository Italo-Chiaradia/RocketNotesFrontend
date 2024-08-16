import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-nodejs-ywu8.onrender.com"
});