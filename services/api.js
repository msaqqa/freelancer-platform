import axios from 'axios';

const api = axios.create({
  baseURL: 'http://dev.taqatportal.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// to add the token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    document.cookie = `token=${token}; path=/`;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
