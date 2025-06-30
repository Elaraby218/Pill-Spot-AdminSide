import axios from 'axios';

const fetchCsrfToken = async (): Promise<string> => {
    try {
        const response = await axios.get(import.meta.env.VITE_CSRF, {
            withCredentials: true 
        });
        const token = response.data.csrfToken || response.data;
        console.log('Fetched CSRF token:', token);
        return token;
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        throw error;
    }
};

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
   // const methodsThatNeedCsrf = ['post', 'put', 'patch', 'delete'];

  //  if (methodsThatNeedCsrf.includes(config.method?.toLowerCase() || '')) {
        try {
            const csrfToken = await fetchCsrfToken();
            config.headers['X-CSRF-Token'] = csrfToken;
            console.log('CSRF token added to request:', csrfToken);
        } catch (error) {
            console.error('Error adding CSRF token:', error);
        }
    //}
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
