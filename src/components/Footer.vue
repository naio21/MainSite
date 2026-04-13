<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link :to="{ path: '/privacy-policy', hash: '#top' }" class="footer-link">Política de Privacidade</router-link>
        <span class="separator">|</span>
        <router-link :to="{ path: '/data-retention', hash: '#top' }" class="footer-link">Política de Retenção de Dados</router-link>
        <span class="separator">|</span>
        <router-link :to="{ path: '/subscribing-policy', hash: '#top' }" class="footer-link">Política de Assinaturas</router-link>
        <span class="separator">|</span>
        <router-link :to="{ path: '/contact', hash: '#top' }" class="footer-link">Contato</router-link>
      </div>
      <div class="footer-info">
        <p>&copy; {{ currentYear }} IVAN BONORA PRADO MEI. | CNPJ 17.887.355/0001-47</p>
        <p>São João da Boa Vista - SP - Brasil</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
