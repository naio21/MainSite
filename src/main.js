import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Auth from './pages/Auth.vue'
import WatchSR from './pages/WatchSR.vue'
import { authService } from './service/authService'
import './style.css'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/watchsr',
    name: 'WatchSR',
    component: WatchSR,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!authService.getToken()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    // Redirect to Auth page if route requires authentication and user is not authenticated
    next({ 
      name: 'Auth',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
