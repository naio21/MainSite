<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-tabs">
        <button 
          :class="['tab-button', { active: activeTab === 'signin' }]"
          @click="activeTab = 'signin'"
        >
          Login
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'signup' }]"
          @click="activeTab = 'signup'"
        >
          Criar Conta
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'forgot' }]"
          @click="activeTab = 'forgot'"
        >
          Esqueci minha Senha
        </button>
      </div>

      <!-- Sign In Section -->
      <div v-if="activeTab === 'signin'" class="auth-form">
        <h2>Login</h2>
        <form @submit.prevent="handleSignIn">
          <div class="form-group">
            <label for="signin-email">E-mail:</label>
            <input 
              id="signin-email"
              v-model="signInForm.email" 
              type="email" 
              required
              placeholder="Digite seu e-mail"
            >
          </div>
          <div class="form-group">
            <label for="signin-password">Senha:</label>
            <input 
              id="signin-password"
              v-model="signInForm.password" 
              type="password" 
              required
              placeholder="Digite sua senha"
            >
          </div>
          <button type="submit" class="submit-button">Login</button>
          <p class="message" :class="signInMessage.type" v-if="signInMessage.text">
            {{ signInMessage.text }}
          </p>
        </form>
      </div>

      <!-- Forgot Password Section -->
      <div v-if="activeTab === 'forgot'" class="auth-form">
        <h2>Recuperar Senha</h2>
        <form @submit.prevent="handleForgotPassword">
          <div class="form-group">
            <label for="forgot-email">E-mail:</label>
            <input 
              id="forgot-email"
              v-model="forgotForm.email" 
              type="email" 
              required
              placeholder="Digite seu e-mail para receber o link de recuperação"
            >
          </div>
          <button type="submit" class="submit-button">Enviar Link de Recuperação</button>
          <p class="message" :class="forgotMessage.type" v-if="forgotMessage.text">
            {{ forgotMessage.text }}
          </p>
        </form>
      </div>

      <!-- Sign Up Section -->
      <div v-if="activeTab === 'signup'" class="auth-form">
        <h2>Criar Conta</h2>
        <form @submit.prevent="handleSignUp">
          <div class="form-group">
            <label for="signup-nome">Nome:</label>
            <input 
              id="signup-nome"
              v-model="signUpForm.nome" 
              type="text" 
              required
              placeholder="Digite seu nome completo"
            >
          </div>

          <div class="form-group">
            <label for="signup-documento">Documento (CPF/CNPJ):</label>
            <input 
              id="signup-documento"
              v-model="signUpForm.documento" 
              type="text" 
              required
              placeholder="000.000.000-00 ou 00.000.000/0000-00"
              maxlength="18"
              @blur="validateDocumento"
            >
            <p class="error-message" v-if="documentoError">{{ documentoError }}</p>
          </div>

          <div class="form-group">
            <label for="signup-telefone">Telefone:</label>
            <input 
              id="signup-telefone"
              v-model="signUpForm.telefone" 
              type="tel" 
              required
              placeholder="(11) 98765-4321"
              maxlength="15"
              @input="maskPhoneNumber"
            >
          </div>

          <div class="form-group">
            <label for="signup-razao">Razão Social:</label>
            <input 
              id="signup-razao"
              v-model="signUpForm.razaoSocial" 
              type="text" 
              required
              placeholder="Razão Social da sua empresa"
            >
          </div>

          <div class="form-group">
            <label for="signup-fantasia">Nome Fantasia:</label>
            <input 
              id="signup-fantasia"
              v-model="signUpForm.nomeFantasia" 
              type="text" 
              required
              placeholder="Nome Fantasia da sua empresa"
            >
          </div>

          <div class="form-group">
            <label for="signup-email">E-mail:</label>
            <input 
              id="signup-email"
              v-model="signUpForm.email" 
              type="email" 
              required
              placeholder="seu.email@example.com"
            >
          </div>

          <div class="form-group">
            <label for="signup-senha">Senha:</label>
            <input 
              id="signup-senha"
              v-model="signUpForm.senha" 
              type="password" 
              required
              placeholder="Crie uma senha segura"
            >
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Criando Conta...' : 'Criar Conta' }}
          </button>
          <p class="message" :class="signUpMessage.type" v-if="signUpMessage.text">
            {{ signUpMessage.text }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { isCNPJ, isCPF } from 'validation-br';
import { authService } from '../service/authService';

export default {
  name: 'Auth',
  data() {
    return {
      activeTab: 'signin',
      isSubmitting: false,
      signInForm: {
        email: '',
        password: ''
      },
      forgotForm: {
        email: ''
      },
      signUpForm: {
        nome: '',
        documento: '',
        telefone: '',
        razaoSocial: '',
        nomeFantasia: '',
        email: '',
        senha: ''
      },
      signInMessage: {
        text: '',
        type: ''
      },
      forgotMessage: {
        text: '',
        type: ''
      },
      signUpMessage: {
        text: '',
        type: ''
      },
      documentoError: ''
    }
  },
  methods: {
    validateDocumento() {
      const documento = this.signUpForm.documento.replace(/\D/g, '');
      
      if (!documento) {
        this.documentoError = 'Documento é obrigatório.';
        return false;
      }
      
      if (documento.length === 11) {
        if (!isCPF(documento)) {
          this.documentoError = 'CPF inválido.';
          return false;
        }
      } else if (documento.length === 14) {
        if (!isCNPJ(documento)) {
          this.documentoError = 'CNPJ inválido.';
          return false;
        }
      } else {
        this.documentoError = 'Documento deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ).';
        return false;
      }
      
      this.documentoError = '';
      return true;
    },
    handleSignIn() {
      try {
        authService.login(this.signInForm.email, this.signInForm.password)
          .then(response => {
            if (response.data.token) {
              authService.setToken(response.data.token);
              this.signInMessage = {
                text: 'Login realizado com sucesso!',
                type: 'success'
              };
              // Redirect to home after 2 seconds
              setTimeout(() => {
                this.$router.push('/');
              }, 2000);
            }
          })
          .catch(error => {
            console.error('Login error:', error);
            this.signInMessage = {
              text: error.response?.data?.message || 'E-mail ou senha inválidos.',
              type: 'error'
            };
          });
      } catch (error) {
        console.error('Error:', error);
        this.signInMessage = {
          text: 'Erro ao realizar login. Tente novamente.',
          type: 'error'
        };
      }
    },
    handleForgotPassword() {
      // TODO: Implement forgot password endpoint with your API
      // Your current API doesn't have a forgot password endpoint visible in Swagger
      // You'll need to configure this with your backend
      console.log('Forgot Password:', this.forgotForm);
      this.forgotMessage = {
        text: 'Funcionalidade de recuperação de senha será implementada em breve.',
        type: 'info'
      };
      setTimeout(() => {
        this.forgotForm.email = '';
        this.forgotMessage = { text: '', type: '' };
      }, 3000);
    },
    async handleSignUp() {
      if (!this.validateDocumento()) {
        return;
      }

      this.isSubmitting = true;
      try {
        // Map form data to API schema
        const clientData = {
          nome: this.signUpForm.nome,
          documento: this.signUpForm.documento.replace(/\D/g, ''),
          telefone: this.signUpForm.telefone,
          razaoSocial: this.signUpForm.razaoSocial,
          nomeFantasia: this.signUpForm.nomeFantasia,
          email: this.signUpForm.email,
          senha: this.signUpForm.senha
        };

        const response = await authService.signup(clientData);

        if (response.status === 200 || response.status === 201) {
          this.signUpMessage = {
            text: 'Conta criada com sucesso! Redirecionando...',
            type: 'success'
          };
          // Reset form
          this.resetSignUpForm();
          // Redirect to home after 2 seconds
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
        }
      } catch (error) {
        console.error('Signup error:', error);
        this.signUpMessage = {
          text: error.response?.data?.message || 'Erro ao criar a conta. Por favor, tente novamente.',
          type: 'error'
        };
      } finally {
        this.isSubmitting = false;
      }
    },
    maskPhoneNumber(event) {
      let value = event.target.value.replace(/\D/g, '');
      
      if (value.length > 0) {
        if (value.length <= 2) {
          value = `(${value}`;
        } else if (value.length <= 7) {
          value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else {
          value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
      }
      
      this.signUpForm.telefone = value;
    },
    resetSignUpForm() {
      this.signUpForm = {
        nome: '',
        documento: '',
        telefone: '',
        razaoSocial: '',
        nomeFantasia: '',
        email: '',
        senha: ''
      };
    }
  }
}
</script>
