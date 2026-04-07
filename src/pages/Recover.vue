<template>
  <div class="recover-page">
    <div class="recover-container">
      <!-- Loading State -->
      <div v-if="loading" class="recover-content">
        <h2>Aguarde...</h2>
        <div class="spinner"></div>
      </div>

      <!-- Success State -->
      <div v-else-if="success" class="recover-content success">
        <div class="success-icon">✓</div>
        <h2>Senha Redefinida!</h2>
        <p>Sua senha foi alterada com sucesso.</p>
        <p>Você já pode fazer login com a nova senha.</p>
        <router-link to="/auth" class="submit-button">Ir para Login</router-link>
      </div>

      <!-- Form State -->
      <div v-else class="recover-content">
        <h2>Redefinir Senha</h2>
        <p class="recover-subtitle">Digite e confirme sua nova senha abaixo.</p>
        <form @submit.prevent="handleRecover">
          <div class="form-group">
            <label for="new-password">Nova Senha:</label>
            <input
              id="new-password"
              v-model="form.newPassword"
              type="password"
              required
              placeholder="Digite a nova senha"
              @blur="validateNewPassword"
            >
            <span class="field-error" v-if="errors.newPassword">{{ errors.newPassword }}</span>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirmar Nova Senha:</label>
            <input
              id="confirm-password"
              v-model="form.confirmPassword"
              type="password"
              required
              placeholder="Redigite a nova senha"
              @blur="validateConfirmPassword"
            >
            <span class="field-error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
          </div>
          <button type="submit" class="submit-button" :disabled="submitting">
            {{ submitting ? 'Aguarde...' : 'Redefinir Senha' }}
          </button>
          <p class="message" :class="message.type" v-if="message.text">{{ message.text }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../service/api';

export default {
  name: 'Recover',
  data() {
    return {
      loading: false,
      success: false,
      submitting: false,
      encryptedId: null,
      form: {
        newPassword: '',
        confirmPassword: ''
      },
      errors: {
        newPassword: '',
        confirmPassword: ''
      },
      message: {
        text: '',
        type: ''
      }
    };
  },
  mounted() {
    this.encryptedId = this.$route.query.id;
    if (!this.encryptedId) {
      this.$router.replace('/404');
    }
  },
  methods: {
    validateNewPassword() {
      if (!this.form.newPassword) {
        this.errors.newPassword = 'A nova senha é obrigatória.';
        return false;
      }
      if (this.form.newPassword.length < 6) {
        this.errors.newPassword = 'A senha deve ter no mínimo 6 caracteres.';
        return false;
      }
      this.errors.newPassword = '';
      return true;
    },
    validateConfirmPassword() {
      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = 'Por favor, confirme a nova senha.';
        return false;
      }
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'As senhas não coincidem.';
        return false;
      }
      this.errors.confirmPassword = '';
      return true;
    },
    async handleRecover() {
      if (!this.validateNewPassword() | !this.validateConfirmPassword()) {
        return;
      }

      this.submitting = true;
      this.message = { text: '', type: '' };

      try {
        await apiClient.post('/api/Authentication/reset-password', {
          id: this.encryptedId,
          novaSenha: this.form.newPassword
        });

        this.success = true;
      } catch (err) {
        this.message = {
          text: err.response?.data?.mensagem || 'Erro ao redefinir a senha. Tente novamente.',
          type: 'error'
        };
        console.error('Recover error:', err);
      } finally {
        this.submitting = false;
      }
    }
  }
};
</script>

<style scoped>
.recover-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.recover-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 480px;
  width: 100%;
  overflow: hidden;
}

.recover-content {
  padding: 2.5rem 2rem;
  text-align: center;
  color: #333;
}

.recover-content h2 {
  font-size: 1.75rem;
  margin: 0 0 0.5rem;
  color: #333;
}

.recover-subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: #444;
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.field-error {
  display: block;
  color: #dc2626;
  font-size: 0.825rem;
  margin-top: 0.25rem;
}

.submit-button {
  display: inline-block;
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.1s ease;
  margin-top: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-2px);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9rem;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.success-icon {
  font-size: 4rem;
  color: #28a745;
  margin-bottom: 1rem;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
  margin: 1rem auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
