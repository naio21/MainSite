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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiClient from '../service/api'
import { useHead } from '@unhead/vue'

defineOptions({ name: 'Activate' })

const loading = ref(true)
const success = ref(false)
const error = ref(false)
const errorMessage = ref('Ocorreu um erro ao ativar sua conta. Por favor, tente novamente mais tarde.')
const errorDetails = ref<string | null>(null)
const activationId = ref<string | string[] | null>(null)

const route = useRoute()
const router = useRouter()

async function processActivation() {
  try {
    // Extract 'id' from query parameters
    activationId.value = route.query.id

    // Validate that we have an activation ID
    if (!activationId.value) {
      router.replace('/404')
      return
    }

    // Call the activation endpoint
    await apiClient.post('/api/authentication/activate', null, {
      params: {
        id: activationId.value
      }
    })

    // Success
    loading.value = false
    success.value = true
  } catch (err: any) {
    loading.value = false
    error.value = true

    // Extract error message from API response
    if (err.response?.data?.message) {
      errorMessage.value = err.response.data.message
    } else if (err.response?.data) {
      errorDetails.value = JSON.stringify(err.response.data)
    } else if (err.message) {
      errorMessage.value = err.message
    }

    console.error('Activation error:', err)
  }
}

onMounted(() => {
  processActivation()
})

useHead({
  title: 'Ativação de Conta - ibpsys',
  meta: [
    { name: 'description', content: 'Ative sua conta ibpsys para acessar todos os recursos da plataforma.' },
    { property: 'og:title', content: 'Ativação de Conta - ibpsys' },
    { property: 'og:description', content: 'Ative sua conta ibpsys para acessar todos os recursos da plataforma.' }
  ]
})
</script>

