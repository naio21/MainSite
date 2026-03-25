<template>
  <div class="legal-page">
    <button class="back-button" @click="goBack">← Voltar</button>
    
    <h1>Política de Assinatura</h1>
    
    <div class="content">
      <h2>Watch SR</h2>
      <p>O Sistema de Ordens de Serviço para Relojeiros (Watch SR) oferece um período de degustação de 30 dias para novos usuários.<br />
        Após o término do período, será necessário assinar um plano para continuar utilizando o serviço.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>
