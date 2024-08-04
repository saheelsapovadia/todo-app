import axios from 'axios';

const axiosInstance = axios.create();

// use token from local storage to authenticate requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("interceptor",token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(config);
  return config;
});

export default axiosInstance;