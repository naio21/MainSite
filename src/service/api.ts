import axios, { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'
import { authService } from './authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://www.ibpsys.com.br/watchsr'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authService.getToken()
  if (token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set('Authorization', `Bearer ${token}`)
    } else {
      const headers = AxiosHeaders.from(config.headers)
      headers.set('Authorization', `Bearer ${token}`)
      config.headers = headers
    }
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isLoginRequest = error.config?.url?.includes('/api/Authentication/login')
    if (error.response?.status === 401 && !isLoginRequest) {
      authService.logout()
      if (window.location.pathname !== '/auth') {
        window.location.href = '/auth'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient