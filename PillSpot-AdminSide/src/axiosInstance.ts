import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7298',
    withCredentials: true,
});

export default axiosInstance;
