<template>
  <div class="recover-page">
    <div class="recover-container">
      <div class="recover-content">
        <h2>Recuperar Senha</h2>
        <p class="recover-subtitle">Informe seu e-mail cadastrado e enviaremos um link para redefinir sua senha.</p>
        <form @submit.prevent="handleForgotPassword">
          <div class="form-group">
            <label for="forgot-email">E-mail:</label>
            <input
              id="forgot-email"
              v-model="email"
              type="email"
              required
              placeholder="Digite seu e-mail para receber o link de recuperação"
            >
          </div>
          <button type="submit" class="submit-button" :disabled="submitting">
            {{ submitting ? 'Enviando...' : 'Enviar Link de Recuperação' }}
          </button>
          <p class="message" :class="message.type" v-if="message.text">
            {{ message.text }}
          </p>
        </form>
        <p class="back-link">
          Lembrou a senha? <router-link to="/auth" class="link">Voltar para o Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '../service/authService';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      submitting: false,
      message: {
        text: '',
        type: ''
      }
    };
  },
  methods: {
    handleForgotPassword() {
      this.submitting = true;
      this.message = { text: '', type: '' };

      authService.recover(this.email)
        .then(response => {
          if (response.data?.status === true) {
            this.message = {
              text: response.data.mensagem || 'E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.',
              type: 'success'
            };
          } else {
            this.message = {
              text: response.data?.mensagem || 'Erro ao enviar e-mail de recuperação. Tente novamente.',
              type: 'error'
            };
          }
        })
        .catch(error => {
          console.error('Forgot Password error:', error);
          this.message = {
            text: error.response?.data?.mensagem || 'Erro ao enviar e-mail de recuperação. Tente novamente.',
            type: 'error'
          };
        })
        .finally(() => {
          this.submitting = false;
        });
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
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
}

.back-link {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  text-decoration: underline;
}
</style>
