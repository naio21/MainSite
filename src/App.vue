<template>
  <div class="app-shell">
    <div id="top"></div>
    <!-- Token Expiration Warning -->
    <div v-if="showExpiryWarning" class="expiry-warning">
      <span class="warning-icon">⚠️</span>
      <span class="warning-text">Sua sessão vence em {{ expiryTimeFormatted }}. <router-link to="/auth" class="warning-link">Faça login novamente</router-link></span>
      <button @click="showExpiryWarning = false" class="warning-close">✕</button>
    </div>

    <nav>
      <div class="nav-container">
        <router-link to="/" class="logo-link">
          <img src="./assets/logo.png" alt="Company Logo" class="logo">
        </router-link>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/watch-sr">Produtos</router-link>
          <router-link to="/contact">Contato</router-link>
          <button 
            v-if="isAuthenticated" 
            @click="handleLogout" 
            class="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <Footer></Footer>
    <CookieBanner></CookieBanner>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from './service/authService'
import Footer from './components/Footer.vue'
import CookieBanner from './components/CookieBanner.vue'

defineOptions({ name: 'App' })

const router = useRouter()
const isAuthenticated = ref(false)
const showExpiryWarning = ref(false)
const expiryTimeFormatted = ref('')
let expiryCheckInterval: ReturnType<typeof setInterval> | null = null

function checkAuthentication(): void {
  isAuthenticated.value = authService.isAuthenticated()
}

function formatExpiryTime(): void {
  const expiryTime = authService.getTokenExpiryTime()
  if (!expiryTime) {
    expiryTimeFormatted.value = ''
    return
  }

  const diffMs = expiryTime.getTime() - new Date().getTime()

  if (diffMs < 0) {
    expiryTimeFormatted.value = 'agora'
    return
  }

  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 0) {
    expiryTimeFormatted.value = `em ${hours}h ${minutes}min`
  } else {
    expiryTimeFormatted.value = `em ${minutes} minutos`
  }
}

function checkTokenExpiry(): void {
  if (!isAuthenticated.value) {
    showExpiryWarning.value = false
    return
  }

  if (authService.isTokenExpiringSoon(24)) {
    showExpiryWarning.value = true
    formatExpiryTime()
  } else {
    showExpiryWarning.value = false
  }
}

function handleLogout(): void {
  authService.logout()
  isAuthenticated.value = false
  showExpiryWarning.value = false
  router.push('/')
}

onMounted(() => {
  checkAuthentication()
  checkTokenExpiry()

  expiryCheckInterval = setInterval(() => {
    checkTokenExpiry()
  }, 60000)

  router.afterEach(() => {
    checkAuthentication()
  })
})

onBeforeUnmount(() => {
  if (expiryCheckInterval) {
    clearInterval(expiryCheckInterval)
  }
})
</script>
