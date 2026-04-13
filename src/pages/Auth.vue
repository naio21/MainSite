<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-intro">
        <h2>Acesso aos Produtos</h2>
        <p>Para acessar nossos produtos e serviços, você precisa estar autenticado.<br />
        Este passo é necessário para garantir a legalidade, segurança e integridade dos seus dados em nossa plataforma.<br />
        Para mais informações sobre como utilizamos seus dados, consulte nossa <router-link to="/privacy-policy" class="link">Política de Privacidade</router-link>, <router-link to="/data-retention" class="link">Política de Retenção de Dados</router-link> e <router-link to="/subscribing-policy" class="link">Política de Assinatura</router-link>.<br />
        Faça login ou cadastre-se caso ainda não possua uma conta.</p>
      </div>

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
              v-model="signInForm.senha" 
              type="password" 
              required
              placeholder="Digite sua senha"
            >
          </div>
          <button type="submit" class="submit-button">Login</button>
          <p class="message" :class="signInMessage.type" v-if="signInMessage.text">
            {{ signInMessage.text }}
          </p>
          <p class="forgot-link">
            <router-link to="/forgot-password">Esqueci minha senha</router-link>
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
              placeholder="Digite seu nome completo"
              @blur="validateNome"
            >
            <p class="error-message" v-if="nomeError">{{ nomeError }}</p>
          </div>

          <div class="form-group">
            <label for="signup-documento">Documento (CPF/CNPJ):</label>
            <input 
              id="signup-documento"
              v-model="signUpForm.documento" 
              type="text" 
              placeholder="000.000.000-00 ou 00.000.000/0000-00"
              maxlength="18"
              @input="maskDocumento"
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
              placeholder="(11) 98765-4321"
              maxlength="15"
              @input="maskPhoneNumber"
              @blur="validateTelefone"
            >
            <p class="error-message" v-if="telefoneError">{{ telefoneError }}</p>
          </div>

          <div class="form-group">
            <label for="signup-razao">Razão Social:</label>
            <input 
              id="signup-razao"
              v-model="signUpForm.razaoSocial" 
              type="text" 
              placeholder="Razão Social da sua empresa"
              @blur="validateRazaoSocial"
            >
            <p class="error-message" v-if="razaoSocialError">{{ razaoSocialError }}</p>
          </div>

          <div class="form-group">
            <label for="signup-fantasia">Nome Fantasia:</label>
            <input 
              id="signup-fantasia"
              v-model="signUpForm.nomeFantasia" 
              type="text" 
              placeholder="Nome Fantasia da sua empresa"
            >
          </div>

          <div class="form-group">
            <label for="signup-email">E-mail:</label>
            <input 
              id="signup-email"
              v-model="signUpForm.email" 
              type="email" 
              placeholder="seu.email@example.com"
              @blur="validateEmail"
            >
            <p class="error-message" v-if="emailError">{{ emailError }}</p>
          </div>

          <div class="form-group">
            <label for="signup-senha">Senha:</label>
            <input 
              id="signup-senha"
              v-model="signUpForm.senha" 
              type="password" 
              placeholder="Crie uma senha segura"
              @blur="validateSenha"
            >
            <p class="error-message" v-if="senhaError">{{ senhaError }}</p>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting || signUpSuccess">
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
        senha: ''
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
      signUpMessage: {
        text: '',
        type: ''
      },
      signUpSuccess: false,
      nomeError: '',
      telefoneError: '',
      razaoSocialError: '',
      emailError: '',
      senhaError: '',
      documentoError: ''
    }
  },
  methods: {
    maskDocumento(event) {
      let value = event.target.value.replace(/\D/g, '');
      let masked = '';

      if (value.length === 11) {
        // CPF format: XXX.XXX.XXX-XX
        masked = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9);
      } else if (value.length === 14) {
        // CNPJ format: XX.XXX.XXX/XXXX-XX
        masked = value.slice(0, 2) + '.' + value.slice(2, 5) + '.' + value.slice(5, 8) + '/' + value.slice(8, 12) + '-' + value.slice(12);
      } else {
        masked = value;
      }

      this.signUpForm.documento = masked;
    },
    validateDocumento() {
      const documento = this.signUpForm.documento.replace(/\D/g, '');
      
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
    validateNome() {
      const nome = this.signUpForm.nome.trim();
      
      if (!nome) {
        this.nomeError = 'Nome é obrigatório.';
        return false;
      }
      
      if (nome.length < 3) {
        this.nomeError = 'Nome deve ter no mínimo 3 caracteres.';
        return false;
      }
      
      this.nomeError = '';
      return true;
    },
    validateTelefone() {
      const telefone = this.signUpForm.telefone.replace(/\D/g, '');
      
      if (!telefone) {
        this.telefoneError = 'Telefone é obrigatório.';
        return false;
      }
      
      if (telefone.length < 10 || telefone.length > 11) {
        this.telefoneError = 'Telefone deve ter 10 ou 11 dígitos.';
        return false;
      }
      
      this.telefoneError = '';
      return true;
    },
    validateRazaoSocial() {
      const razaoSocial = this.signUpForm.razaoSocial.trim();
      
      if (!razaoSocial) {
        this.razaoSocialError = 'Razão Social é obrigatória.';
        return false;
      }
      
      if (razaoSocial.length < 3) {
        this.razaoSocialError = 'Razão Social deve ter no mínimo 3 caracteres.';
        return false;
      }
      
      this.razaoSocialError = '';
      return true;
    },
    validateEmail() {
      const email = this.signUpForm.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email) {
        this.emailError = 'E-mail é obrigatório.';
        return false;
      }
      
      if (!emailRegex.test(email)) {
        this.emailError = 'E-mail inválido.';
        return false;
      }
      
      this.emailError = '';
      return true;
    },
    validateSenha() {
      const senha = this.signUpForm.senha;
      
      if (!senha) {
        this.senhaError = 'Senha é obrigatória.';
        return false;
      }
      
      if (senha.length < 6) {
        this.senhaError = 'Senha deve ter no mínimo 6 caracteres.';
        return false;
      }
      
      this.senhaError = '';
      return true;
    },
    handleSignIn() {
      try {
        authService.login(this.signInForm.email, this.signInForm.senha)
          .then(response => {
            // API returns token in response.data.dados (lowercase)
            const token = response.data?.dados;
            
            if (token) {
              authService.setToken(token);
              this.signInMessage = {
                text: 'Login realizado com sucesso!',
                type: 'success'
              };
              // Redirect to the originally requested page or home after 2 seconds
              setTimeout(() => {
                const redirectPath = sessionStorage.getItem('redirectPath');
                sessionStorage.removeItem('redirectPath');
                const redirectTo = redirectPath || '/';
                this.$router.push(redirectTo);
              }, 2000);
            } else {
              console.warn('No token found in response:', response.data);
              this.signInMessage = {
                text: 'Resposta do servidor inválida. Tente novamente.',
                type: 'error'
              };
            }
          })
          .catch(error => {
            console.error('Login error:', error);
            this.signInMessage = {
              text: error.response?.data?.mensagem || 'E-mail ou senha inválidos.',
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
    async handleSignUp() {
      // Validate all fields
      if (!this.validateNome() || 
          !this.validateDocumento() || 
          !this.validateTelefone() || 
          !this.validateRazaoSocial() || 
          !this.validateEmail() || 
          !this.validateSenha()) {
        return;
      }

      this.isSubmitting = true;
      try {
        // Map form data to RegisterModel structure
        const signUpData = {
          nome: this.signUpForm.nome,
          documento: this.signUpForm.documento.replace(/\D/g, ''),
          telefone: this.signUpForm.telefone,
          razaoSocial: this.signUpForm.razaoSocial,
          nomeFantasia: this.signUpForm.nomeFantasia,
          email: this.signUpForm.email,
          senha: this.signUpForm.senha
        };

        const response = await authService.signup(signUpData);

        // Check if registration was successful
        if (response.data?.status === true) {
          this.signUpSuccess = true;
          this.signUpMessage = {
            text: 'Conta criada com sucesso! Verifique seu e-mail para ativar a conta.',
            type: 'success'
          };
        } else {
          this.signUpMessage = {
            text: response.data?.mensagem || 'Erro ao criar a conta. Por favor, tente novamente.',
            type: 'error'
          };
        }
      } catch (error) {
        console.error('Signup error:', error);
        const errorMessage = error.response?.data?.mensagem || 'Erro ao criar a conta. Por favor, tente novamente.';
        this.signUpMessage = {
          text: errorMessage,
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
      // Clear all error messages
      this.nomeError = '';
      this.documentoError = '';
      this.telefoneError = '';
      this.razaoSocialError = '';
      this.emailError = '';
      this.senhaError = '';
    }
  }
}
</script>
