import axios from "axios";

// Hardcode the URL for now to fix the issue
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

export default axiosInstance;