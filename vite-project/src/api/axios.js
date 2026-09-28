import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Axios: 401 detected, attempting refresh...');
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh');
      if (refreshToken) {
        try {
          const res = await axios.post('http://localhost:8000/api/v1/auth/refresh/', { refresh: refreshToken });
          console.log('Axios: Refresh successful.');
          localStorage.setItem('access', res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Axios: Refresh failed:', refreshError.message);
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/login';
        }
      } else {
        console.log('Axios: No refresh token available, redirecting to login.');
        localStorage.removeItem('access');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
