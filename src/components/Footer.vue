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
      <div class="footer-social" aria-label="Redes sociais">
        <a
          class="social-link"
          href="https://www.linkedin.com/in/naio21"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
            <path
              d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 17V10.66H6.26V17H8.34M7.3 9.79A1.2 1.2 0 1 0 7.3 7.39A1.2 1.2 0 0 0 7.3 9.79M17.74 17V13.41C17.74 11.48 16.71 10.58 15.34 10.58C14.23 10.58 13.73 11.19 13.45 11.62V10.66H11.37C11.4 11.29 11.37 17 11.37 17H13.45V13.46C13.45 13.27 13.46 13.08 13.52 12.95C13.67 12.57 14.02 12.18 14.59 12.18C15.34 12.18 15.64 12.75 15.64 13.59V17H17.74Z"
            />
          </svg>
          <span>LinkedIn</span>
        </a>

        <a
          class="social-link"
          href="https://github.com/naio21"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" class="social-icon">
            <path
              d="M12 2C6.48 2 2 6.58 2 12.22C2 16.73 4.87 20.56 8.84 21.91C9.34 22.01 9.52 21.69 9.52 21.41C9.52 21.16 9.51 20.33 9.51 19.44C6.73 20.06 6.14 18.22 6.14 18.22C5.68 17.03 5.03 16.71 5.03 16.71C4.12 16.08 5.1 16.09 5.1 16.09C6.11 16.16 6.64 17.15 6.64 17.15C7.54 18.73 9 18.27 9.57 18C9.67 17.34 9.92 16.89 10.2 16.64C7.98 16.38 5.65 15.49 5.65 11.5C5.65 10.37 6.04 9.45 6.68 8.72C6.58 8.47 6.24 7.42 6.77 6.01C6.77 6.01 7.61 5.74 9.5 7.05C10.3 6.82 11.15 6.71 12 6.71C12.85 6.71 13.7 6.82 14.5 7.05C16.39 5.74 17.23 6.01 17.23 6.01C17.76 7.42 17.42 8.47 17.32 8.72C17.96 9.45 18.35 10.37 18.35 11.5C18.35 15.5 16.01 16.37 13.79 16.63C14.15 16.94 14.46 17.55 14.46 18.49C14.46 19.83 14.45 20.92 14.45 21.41C14.45 21.69 14.63 22.02 15.13 21.91C19.1 20.56 22 16.73 22 12.22C22 6.58 17.52 2 12 2Z"
            />
          </svg>
          <span>GitHub</span>
        </a>
      </div>
      <div class="footer-info">
        <p>&copy; {{ currentYear }} IVAN BONORA PRADO MEI. | CNPJ 17.887.355/0001-47</p>
        <p>São João da Boa Vista - SP - Brasil</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<style scoped>
.footer-social {
  margin-bottom: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #495057;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.social-link:hover {
  background-color: #e9ecef;
  color: #212529;
}

.social-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
