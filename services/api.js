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
      // handle expired token (401)
      if (error.response?.status === 401) {
        // Clear token and language
        Cookies.remove('token');
        Cookies.remove('language');

        // redirect to login page (adjust the path as needed)
        window.location.replace = '/signin';

        // optionally, you can show a message or log it
        console.warn('Session expired. Logging out...');
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const apiTaqat = createAxiosInstance(
  process.env.NEXT_PUBLIC_TAQAT_API_URL,
);
