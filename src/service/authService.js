import apiClient from './api';

const TOKEN_KEY = 'authToken';
const TOKEN_EXPIRY_KEY = 'authTokenExpiry';
const TOKEN_EXPIRY_DAYS = 14;
const hasStorage = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const buildExpiryTime = () => new Date().getTime() + (TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

function ensureTokenExpiry() {
  if (!hasStorage()) return null;

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  const parsedExpiry = Number.parseInt(expiryTime ?? '', 10);

  if (!expiryTime || Number.isNaN(parsedExpiry)) {
    const newExpiryTime = buildExpiryTime();
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(newExpiryTime));
    return newExpiryTime;
  }

  return parsedExpiry;
}

export const authService = {
  login(email, senha) {
    return apiClient.post('/api/Authentication/login', {
      email,
      senha
    });
  },

recover(email) {
  return apiClient.post('/api/Authentication/recover', { email });
},

  signup(formData) {
    // Map form data to RegisterModel structure expected by the backend
    const registerModel = {
      empresa: {
        documento: formData.documento.replace(/\D/g, ''),
        razaoSocial: formData.razaoSocial,
        nomeFantasia: formData.nomeFantasia
      },
      usuario: {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone.replace(/\D/g, ''),
        senha: formData.senha
      }
    };
    return apiClient.post('/api/Authentication/register', registerModel);
  },

  logout() {
    if (!hasStorage()) return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  setToken(token) {
    if (!hasStorage() || !token) return;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(buildExpiryTime()));
  },

  getToken() {
    if (!hasStorage()) return null;

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    ensureTokenExpiry();

    if (this.isTokenExpired()) {
      this.logout();
      return null;
    }

    return token;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  isTokenExpired() {
    if (!hasStorage()) {
      return true;
    }

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return true;
    }

    const expiryTime = ensureTokenExpiry();
    if (!expiryTime) {
      return true;
    }

    return new Date().getTime() > expiryTime;
  },

  getTokenExpiryTime() {
    if (!hasStorage()) {
      return null;
    }

    const expiryTime = ensureTokenExpiry();
    if (!expiryTime) {
      return null;
    }

    return new Date(expiryTime);
  },

  getRemainingTime() {
    if (!hasStorage()) {
      return 0;
    }

    const expiryTime = ensureTokenExpiry();
    if (!expiryTime) {
      return 0;
    }

    const remaining = expiryTime - new Date().getTime();
    return Math.max(0, remaining);
  },

  isTokenExpiringSoon(hoursThreshold = 24) {
    const remainingMs = this.getRemainingTime();
    const thresholdMs = hoursThreshold * 60 * 60 * 1000;
    return remainingMs < thresholdMs && remainingMs > 0;
  }
};
