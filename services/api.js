import axios from 'axios';
import Cookies from 'js-cookie';

export const apiTaqat = axios.create({
  baseURL: 'https://dev.taqatportal.com/api',
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

// add a token if it exists
apiTaqat.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    const language = Cookies.get('language');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (language) {
      config.headers['Accept-Language'] = language;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
