import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// Create an Axios instance with default headers
const accessToken = JSON.parse(sessionStorage.getItem("token"));
console.log("accessToken", accessToken);

const axiosInstance = axios.create({
  baseURL: " https://e066-223-190-87-209.ngrok-free.app", // Replace with your API base URL
  headers: {
    Authorization: `Bearer ${accessToken}`, // Add the token to the 'Authorization' header
    "Content-Type": "application/json", // Adjust the content type as needed
  },
});
export default axiosInstance;

// "http://localhost:8080"                                