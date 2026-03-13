import apiClient from './api';

const TOKEN_KEY = 'authToken';
const TOKEN_EXPIRY_KEY = 'authTokenExpiry';
const TOKEN_EXPIRY_DAYS = 14;

export const authService = {
  login(email, senha) {
    return apiClient.post('/api/Authentication/login', {
      email,
      senha
    });
  },

  signup(clientData) {
    return apiClient.post('/api/Clientes', clientData);
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  setToken(token) {
    // Store token
    localStorage.setItem(TOKEN_KEY, token);
    
    // Calculate expiration time (14 days from now)
    const expiryTime = new Date().getTime() + (TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime);
  },

  getToken() {
    // Check if token is expired
    if (this.isTokenExpired()) {
      this.logout();
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  isTokenExpired() {
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) {
      return true;
    }
    return new Date().getTime() > parseInt(expiryTime);
  },

  getTokenExpiryTime() {
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) {
      return null;
    }
    return new Date(parseInt(expiryTime));
  },

  getRemainingTime() {
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) {
      return 0;
    }
    const remaining = parseInt(expiryTime) - new Date().getTime();
    return Math.max(0, remaining);
  },

  isTokenExpiringSoon(hoursThreshold = 24) {
    const remainingMs = this.getRemainingTime();
    const thresholdMs = hoursThreshold * 60 * 60 * 1000;
    return remainingMs < thresholdMs && remainingMs > 0;
  }
};
