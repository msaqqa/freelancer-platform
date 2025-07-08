import axios from 'axios';
import Cookies from 'js-cookie';
import { handleApiError } from '@/lib/error-handler';

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // request interceptor
  instance.interceptors.request.use(
    (config) => {
      // add a token if it exists
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // add a language if it exists
      const language = Cookies.get('language');
      if (language) {
        config.headers['Accept-Language'] = language;
      }
      // check content type to change header type
      if (config.data instanceof FormData) {
        config.headers.setContentType('multipart/form-data');
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const showNotification = error.config?.showNotification !== false;
      const errorResponse = handleApiError(error, { showNotification });
      return Promise.reject(errorResponse);
    },
  );

  return instance;
};

export const apiTaqat = createAxiosInstance(
  process.env.NEXT_PUBLIC_TAQAT_API_URL,
);
