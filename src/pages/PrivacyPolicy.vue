<template>
  <div class="legal-page">
    <button class="back-button" @click="goBack">← Voltar</button>
    
    <h1>Política de Privacidade</h1>
    
    <div class="content">
      <p>Seus dados pessoais estão seguros conosco. Por questões éticas e legais (LGPD), a ibpsys não é proprietária dos dados coletados, apenas custodiante.</p>
      <p>Tais informações são mantidas sob sigilo total, sendo utilizadas exclusivamente para fins internos, e <strong>jamais serão compartilhadas com terceiros sem o seu consentimento expresso</strong>.</p>
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
