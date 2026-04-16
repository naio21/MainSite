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
  </div>
</template>

<script>
import { authService } from './service/authService';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
      isAuthenticated: false,
      showExpiryWarning: false,
      expiryTimeFormatted: '',
      expiryCheckInterval: null
    };
  },
  mounted() {
    this.checkAuthentication();
    this.checkTokenExpiry();
    
    // Check every minute for token expiry
    this.expiryCheckInterval = setInterval(() => {
      this.checkTokenExpiry();
    }, 60000);
    
    // Check authentication status whenever route changes
    this.$router.afterEach(() => {
      this.checkAuthentication();
    });
  },
  beforeUnmount() {
    if (this.expiryCheckInterval) {
      clearInterval(this.expiryCheckInterval);
    }
  },
  methods: {
    checkAuthentication() {
      this.isAuthenticated = authService.isAuthenticated();
    },
    checkTokenExpiry() {
      if (!this.isAuthenticated) {
        this.showExpiryWarning = false;
        return;
      }

      // Check if token is expiring soon (within 24 hours)
      if (authService.isTokenExpiringSoon(24)) {
        this.showExpiryWarning = true;
        this.formatExpiryTime();
      } else {
        this.showExpiryWarning = false;
      }
    },
    formatExpiryTime() {
      const expiryTime = authService.getTokenExpiryTime();
      if (!expiryTime) {
        this.expiryTimeFormatted = '';
        return;
      }

      const now = new Date();
      const diffMs = expiryTime - now;
      
      if (diffMs < 0) {
        this.expiryTimeFormatted = 'agora';
        return;
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 0) {
        this.expiryTimeFormatted = `em ${hours}h ${minutes}min`;
      } else {
        this.expiryTimeFormatted = `em ${minutes} minutos`;
      }
    },
    handleLogout() {
      authService.logout();
      this.isAuthenticated = false;
      this.showExpiryWarning = false;
      this.$router.push('/');
    }
  }
}
</script>
