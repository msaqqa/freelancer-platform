import axios from 'axios';
import Cookies from 'js-cookie';

export const apiTaqat = axios.create({
  baseURL: 'https://dev.taqatportal.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// add a token if it exists
apiTaqat.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
