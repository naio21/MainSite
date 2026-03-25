<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link to="/privacy-policy" class="footer-link">Política de Privacidade</router-link>
        <span class="separator">|</span>
        <router-link to="/data-retention" class="footer-link">Política de Retenção de Dados</router-link>
        <span class="separator">|</span>
        <router-link to="/subscribing-policy" class="footer-link">Política de Assinaturas</router-link>
      </div>
      <div class="footer-info">
        <p>&copy; {{ currentYear }} IVAN BONORA PRADO MEI. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
