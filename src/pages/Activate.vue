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

      <!-- No ID State -->
      <div v-else-if="noActivationId" class="activate-content error">
        <div class="error-icon">✕</div>
        <h2>Link de Ativação Inválido</h2>
        <p>O link de ativação não contém um identificador válido.</p>
        <p>Por favor, verifique o link enviado por e-mail.</p>
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
      noActivationId: false,
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
          this.loading = false;
          this.noActivationId = true;
          return;
        }

        // Call the activation endpoint
        await apiClient.get('/api/authorization/activate', {
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

<style scoped>
.activate-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.activate-container {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.activate-content {
  text-align: center;
}

.activate-content h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.activate-content p {
  color: #666;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
}

/* Spinner for loading state */
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 30px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success state */
.activate-content.success {
  color: #27ae60;
}

.success-icon {
  font-size: 64px;
  color: #27ae60;
  margin-bottom: 20px;
  font-weight: bold;
}

.activate-content.success h2 {
  color: #27ae60;
}

.activate-content.success p {
  color: #27ae60;
}

/* Error state */
.activate-content.error {
  color: #e74c3c;
}

.error-icon {
  font-size: 64px;
  color: #e74c3c;
  margin-bottom: 20px;
  font-weight: bold;
}

.activate-content.error h2 {
  color: #e74c3c;
}

.activate-content.error p {
  color: #555;
}

.error-details {
  background-color: #f8f9fa;
  border-left: 4px solid #e74c3c;
  padding: 15px;
  margin: 20px 0;
  border-radius: 4px;
  text-align: left;
}

.details-text {
  font-size: 14px;
  color: #333;
  font-family: monospace;
  word-break: break-word;
}

/* Redirect button */
.redirect-button {
  display: inline-block;
  margin-top: 30px;
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
  cursor: pointer;
}

.redirect-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.redirect-button:active {
  transform: translateY(0);
}

.activate-content.error .redirect-button {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
}

.activate-content.error .redirect-button:hover {
  box-shadow: 0 5px 20px rgba(231, 76, 60, 0.4);
}
</style>
