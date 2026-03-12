import apiClient from './api';

export const authService = {
  login(email, password) {
    return apiClient.post('/api/Authentication/login', {
      email,
      password
    });
  },

  signup(clientData) {
    return apiClient.post('/api/Clientes', clientData);
  },

  logout() {
    localStorage.removeItem('authToken');
  },

  setToken(token) {
    localStorage.setItem('authToken', token);
  },

  getToken() {
    return localStorage.getItem('authToken');
  }
};
