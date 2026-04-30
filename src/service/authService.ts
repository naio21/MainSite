import apiClient from './api'

const TOKEN_KEY = 'authToken'
const TOKEN_EXPIRY_KEY = 'authTokenExpiry'
const TOKEN_EXPIRY_DAYS = 14

const hasStorage = (): boolean => typeof window !== 'undefined' && typeof localStorage !== 'undefined'

const buildExpiryTime = (): number => new Date().getTime() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000

function ensureTokenExpiry(): number | null {
  if (!hasStorage()) return null

  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null

  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY)
  const parsedExpiry = Number.parseInt(expiryTime ?? '', 10)

  if (!expiryTime || Number.isNaN(parsedExpiry)) {
    const newExpiryTime = buildExpiryTime()
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(newExpiryTime))
    return newExpiryTime
  }

  return parsedExpiry
}

interface SignupFormData {
  documento: string
  razaoSocial: string
  nomeFantasia: string
  nome: string
  email: string
  telefone: string
  senha: string
}

function login(email: string, senha: string) {
  return apiClient.post('/api/Authentication/login', {
    email,
    senha
  })
}

function recover(email: string) {
  return apiClient.post('/api/Authentication/recover', { email })
}

function signup(formData: SignupFormData) {
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
  }
  return apiClient.post('/api/Authentication/register', registerModel)
}

function logout(): void {
  if (!hasStorage()) return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(TOKEN_EXPIRY_KEY)
}

function setToken(token: string | null | undefined): void {
  if (!hasStorage() || !token) return
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(TOKEN_EXPIRY_KEY, String(buildExpiryTime()))
}

function isTokenExpired(): boolean {
  if (!hasStorage()) {
    return true
  }

  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) {
    return true
  }

  const expiryTime = ensureTokenExpiry()
  if (!expiryTime) {
    return true
  }

  return new Date().getTime() > expiryTime
}

function getToken(): string | null {
  if (!hasStorage()) return null

  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null

  ensureTokenExpiry()

  if (isTokenExpired()) {
    logout()
    return null
  }

  return token
}

function isAuthenticated(): boolean {
  return !!getToken()
}

function getTokenExpiryTime(): Date | null {
  if (!hasStorage()) {
    return null
  }

  const expiryTime = ensureTokenExpiry()
  if (!expiryTime) {
    return null
  }

  return new Date(expiryTime)
}

function getRemainingTime(): number {
  if (!hasStorage()) {
    return 0
  }

  const expiryTime = ensureTokenExpiry()
  if (!expiryTime) {
    return 0
  }

  const remaining = expiryTime - new Date().getTime()
  return Math.max(0, remaining)
}

function isTokenExpiringSoon(hoursThreshold = 24): boolean {
  const remainingMs = getRemainingTime()
  const thresholdMs = hoursThreshold * 60 * 60 * 1000
  return remainingMs < thresholdMs && remainingMs > 0
}

export const authService = {
  login,
  recover,
  signup,
  logout,
  setToken,
  getToken,
  isAuthenticated,
  isTokenExpired,
  getTokenExpiryTime,
  getRemainingTime,
  isTokenExpiringSoon
}