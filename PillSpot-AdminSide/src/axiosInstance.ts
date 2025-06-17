import axios from 'axios';


const fetchCsrfToken = async (): Promise<string> => {
    try {
        const response = await axios.get(import.meta.env.VITE_CSRF);
        console.log(response.data.csrfToken)
        return response.data.csrfToken || response.data; 
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        throw error;
    }
};


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7298/',
    withCredentials: true,
});


// axiosInstance.interceptors.request.use(async (config) => {
//     try {
//         const csrfToken = await fetchCsrfToken();
//         config.headers['X-Csrf-Token'] = csrfToken;
//         console.log( "hello.... " , config.headers['X-Csrf-Token'])
//     } catch (error) {
//         console.error('Error adding CSRF token:', error);
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

export default axiosInstance;
