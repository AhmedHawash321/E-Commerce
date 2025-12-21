import axios from "axios";

// Hardcode the URL for now to fix the issue
const axiosInstance = axios.create({
    baseURL: 'https://e-commerce-glav.vercel.app/',
    withCredentials: true,
});

export default axiosInstance;