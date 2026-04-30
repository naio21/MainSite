<template>
  <div v-if="visible" class="cookie-banner" role="dialog" aria-label="Aviso de cookies">
    <div class="cookie-banner-content">
      <p>
        Este site utiliza cookies essenciais para o funcionamento da plataforma e para melhorar sua experiência. Ao continuar navegando, você concorda com nossa
        <router-link to="/privacy-policy">Política de Privacidade</router-link>
        em conformidade com a
        <strong>Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)</strong>.
      </p>
      <button class="cookie-dismiss" @click="dismiss">Entendi</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'cookie_consent_dismissed'

const visible = ref(false)

onMounted(() => {
  visible.value = localStorage.getItem(STORAGE_KEY) !== 'true'
})

function dismiss() {
  localStorage.setItem(STORAGE_KEY, 'true')
  visible.value = false
  window.dispatchEvent(new CustomEvent('cookie-consent-granted'))
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #1a1a2e;
  border-top: 1px solid rgba(100, 108, 255, 0.35);
  padding: 1rem 1.5rem;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
}

.cookie-banner-content {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.cookie-banner-content p {
  flex: 1;
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.cookie-banner-content a {
  color: #646cff;
  text-decoration: underline;
}

.cookie-dismiss {
  flex-shrink: 0;
  padding: 0.55rem 1.4rem;
  background: #646cff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cookie-dismiss:hover {
  background: #535bf2;
}

@media (prefers-color-scheme: light) {
  .cookie-banner {
    background: #ffffff;
    border-top-color: rgba(100, 108, 255, 0.2);
  }

  .cookie-banner-content p {
    color: #333;
  }
}
</style>
