<template>
  <div class="activate-page">
    <div class="activate-container">
      <!-- Loading State -->
      <div v-if="loading" class="activate-content">
        <h2>Ativando sua conta...</h2>
        <div class="spinner"></div>
        <p>Por favor, aguarde enquanto ativamos sua conta.</p>
      </div>

      <!-- Success State -->
      <div v-else-if="success" class="activate-content success">
        <div class="success-icon">✓</div>
        <h2>Parabéns!</h2>
        <p>Sua conta foi ativada com sucesso.</p>
        <p>Você já pode fazer login na plataforma.</p>
        <router-link to="/auth" class="redirect-button">Ir para Login</router-link>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="activate-content error">
        <div class="error-icon">✕</div>
        <h2>Erro na Ativação</h2>
        <p>{{ errorMessage }}</p>
        <div class="error-details" v-if="errorDetails">
          <p class="details-text">{{ errorDetails }}</p>
        </div>
        <router-link to="/auth" class="redirect-button">Voltar para Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../service/api';

export default {
  name: 'Activate',
  data() {
    return {
      loading: true,
      success: false,
      error: false,
      errorMessage: 'Ocorreu um erro ao ativar sua conta. Por favor, tente novamente mais tarde.',
      errorDetails: null,
      activationId: null
    }
  },
  mounted() {
    this.processActivation();
  },
  methods: {
    async processActivation() {
      try {
        // Extract 'id' from query parameters
        this.activationId = this.$route.query.id;

        // Validate that we have an activation ID
        if (!this.activationId) {
          this.$router.replace('/404');
          return;
        }

        // Call the activation endpoint
        await apiClient.post('/api/authentication/activate', null, {
          params: {
            id: this.activationId
          }
        });

        // Success
        this.loading = false;
        this.success = true;
      } catch (err) {
        this.loading = false;
        this.error = true;

        // Extract error message from API response
        if (err.response?.data?.message) {
          this.errorMessage = err.response.data.message;
        } else if (err.response?.data) {
          // If response has other error info
          this.errorDetails = JSON.stringify(err.response.data);
        } else if (err.message) {
          this.errorMessage = err.message;
        }

        console.error('Activation error:', err);
      }
    }
  }
}
</script>

