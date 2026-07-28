import axios from "axios";
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 40000,
  withCredentials: true, // Include credentials (cookies) in requests
});
export { client };