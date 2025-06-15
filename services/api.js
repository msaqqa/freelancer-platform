import axios from 'axios';
import Cookies from 'js-cookie';

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
    },
  });

  // add a token if it exists
  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
      const language = Cookies.get('language');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (language) {
        config.headers['Accept-Language'] = language;
      }
      if (config.data instanceof FormData) {
        config.headers.setContentType('multipart/form-data');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export const apiTaqat = createAxiosInstance('https://dev.taqatportal.com/api');
