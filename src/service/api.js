import axios from 'axios';
import { authService } from './authService';

// Get API base URL from environment variables or use default
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.ibpsys.com.br/watchsr';
const API_BASE_URL = 'https://localhost:7132';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      authService.logout();
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
