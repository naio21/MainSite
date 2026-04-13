<template>
  <div class="contact-page">
    <div class="contact-container">
      <h1>Contato</h1>
      <p>Preencha o formulário abaixo e entraremos em contato o mais breve possível. Alternativamente, você pode acessar a <a href='https://www.linkedin.com/in/naio21' target="_blank" rel="noopener noreferrer">minha página do LinkedIn</a> e enviar uma mensagem diretamente por lá.</p>

      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-group">
          <label for="contact-email">E-mail:</label>
          <input
            id="contact-email"
            v-model="form.email"
            type="email"
            required
            placeholder="seuemail@exemplo.com"
          >
        </div>

        <div class="form-group">
          <label for="contact-subject">Assunto:</label>
          <input
            id="contact-subject"
            v-model="form.subject"
            type="text"
            required
            maxlength="150"
            placeholder="Assunto da mensagem"
          >
        </div>

        <div class="form-group">
          <label for="contact-body">Mensagem:</label>
          <textarea
            id="contact-body"
            v-model="form.message"
            required
            rows="8"
            maxlength="2000"
            placeholder="Digite sua mensagem aqui..."
          ></textarea>
        </div>

        <button type="submit" class="submit-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
        </button>

        <p v-if="message.text" class="message" :class="message.type">
          {{ message.text }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import apiClient from '../service/api';

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      message: {
        text: '',
        type: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitting = true;
      this.message = { text: '', type: '' };

      try {
        await apiClient.post('/api/contact', {
          email: this.form.email,
          subject: this.form.subject,
          message: this.form.message
        });

        this.message = {
          text: 'Mensagem enviada com sucesso! Em breve entraremos em contato.',
          type: 'success'
        };
        this.form = { email: '', subject: '', message: '' };
      } catch (error) {
        const status = error.response?.status;
        if (status === 429) {
          this.message = {
            text: 'Muitas tentativas. Por favor, aguarde alguns minutos antes de tentar novamente.',
            type: 'error'
          };
        } else {
          this.message = {
            text: 'Erro ao enviar a mensagem. Por favor, tente novamente mais tarde.',
            type: 'error'
          };
        }
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.contact-page {
  padding: 2rem 1rem;
}

.contact-container {
  max-width: 640px;
  margin: 0 auto;
}

.contact-container h1 {
  margin-bottom: 0.5rem;
}

.contact-container > p {
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: justify;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
}

.form-group label {
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  padding: 0.6em 0.8em;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #1a1a1a;
  color: inherit;
  font-family: inherit;
  font-size: 1em;
  resize: vertical;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #646cff;
}

.submit-button {
  align-self: flex-start;
  background-color: #646cff;
  color: #fff;
  border: none;
  padding: 0.65em 1.6em;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover:not(:disabled) {
  background-color: #535bf2;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  margin-top: 0.5rem;
  padding: 0.75em 1em;
  border-radius: 6px;
  font-size: 0.95em;
}

.message.success {
  background-color: rgba(72, 199, 142, 0.15);
  color: #48c78e;
  border: 1px solid #48c78e44;
}

.message.error {
  background-color: rgba(241, 70, 104, 0.15);
  color: #f14668;
  border: 1px solid #f1466844;
}

@media (prefers-color-scheme: light) {
  .contact-container > p {
    color: #555;
  }

  .form-group input,
  .form-group textarea {
    background-color: #f9f9f9;
    border-color: #ccc;
    color: #213547;
  }
}
</style>
