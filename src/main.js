import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Auth from './pages/Auth.vue'
import Activate from './pages/Activate.vue'
import Products from './pages/Products.vue'
import PrivacyPolicy from './pages/PrivacyPolicy.vue'
import DataRetention from './pages/DataRetention.vue'
import SubscribingPolicy from './pages/SubscribingPolicy.vue'
import NotFound from './pages/404.vue'
import Recover from './pages/Recover.vue'
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
    path: '/activate',
    name: 'Activate',
    component: Activate
  },
  {
    path: '/recover',
    name: 'Recover',
    component: Recover
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { requiresAuth: true }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/data-retention',
    name: 'DataRetention',
    component: DataRetention
  },
  {
    path: '/subscribing-policy',
    name: 'SubscribingPolicy',
    component: SubscribingPolicy
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check authentication
router.beforeEach((to, from) => {
  const isAuthenticated = !!authService.getToken()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    // Redirect to Auth page if route requires authentication and user is not authenticated
    // Store the redirect path in sessionStorage to avoid issues with query parameters
    sessionStorage.setItem('redirectPath', to.fullPath)
    return { name: 'Auth' }
  }
})

const app = createApp(App)
app.use(router)

router.isReady().catch(() => {}).then(() => {
  app.mount('#app')
})
