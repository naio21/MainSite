import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import { authService } from './service/authService'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
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
})

router.beforeEach((to) => {
  const isAuthenticated = !!authService.getToken()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    sessionStorage.setItem('redirectPath', to.fullPath)
    return { name: 'Auth' }
  }
})

const app = createApp(App)
app.use(router)

router
  .isReady()
  .catch(() => {})
  .then(() => {
    app.mount('#app')
  })