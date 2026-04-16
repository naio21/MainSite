import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './routes.js'
import { authService } from './service/authService'
import './style.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
      if (to.hash) {
        return {
          el: to.hash,
          top: 0
        }
      }
      return { top: 0 }
    }
  },
  ({ router, isClient }) => {
    if (isClient) {
      router.beforeEach((to) => {
        const isAuthenticated = !!authService.getToken()
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
        if (requiresAuth && !isAuthenticated) {
          sessionStorage.setItem('redirectPath', to.fullPath)
          return { name: 'Auth' }
        }
      })
    }
  }
)
