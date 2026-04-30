<template>
  <div class="legal-page">
    <button class="back-button" @click="goBack">← Voltar</button>
    
    <h1>Política de Retenção de Dados</h1>
    
    <div class="content">
        <p>Conforme especificado em nossa Política de Privacidade, a ibpsys mantém seus dados pelo tempo necessário para cumprir as finalidades para as quais foram coletados.</p>
        <p>Após esse período, os dados são permanentemente excluídos de nossos sistemas, garantindo a segurança e a privacidade de suas informações pessoais.</p>
        <p>A exclusão será efetuada em três situações diferentes, de forma segura e irreversível.</p>
        <ul>
            <li><strong>Solicitação do Usuário:</strong> Você pode solicitar a exclusão de seus dados a qualquer momento, entrando em contato conosco por meio dos canais de atendimento disponíveis.</li>
            <li><strong>Inatividade Prolongada:</strong> Ao se cadastrar, você recebe um link para ativação de sua conta por e-mail. A data de validade desse link é de 30 dias. Caso a conta não seja ativada dentro desse período, os dados associados serão excluídos.</li>
            <li><strong>Finalização do Serviço:</strong> Caso você opte por encerrar seu relacionamento conosco, seu cadastro ficará inativo pelo período de 1 ano. Após esse período, os dados serão permanentemente excluídos.</li>
        </ul>            
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

const router = useRouter()

function goBack() {
  router.back()
}

useHead({
  title: 'Política de Retenção de Dados - ibpsys',
  meta: [
    { name: 'description', content: 'Saiba por quanto tempo a ibpsys mantém os dados pessoais e em quais situações eles são excluídos de forma segura.' },
    { name: 'keywords', content: 'retenção de dados, exclusão de dados, privacidade, LGPD, ibpsys' },
    { property: 'og:title', content: 'Política de Retenção de Dados - ibpsys' },
    { property: 'og:description', content: 'Saiba por quanto tempo a ibpsys mantém os dados pessoais e em quais situações eles são excluídos de forma segura.' }
  ]
})
</script>
