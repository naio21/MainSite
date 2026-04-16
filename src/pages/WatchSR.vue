<template>
    <div class="download-page">
        <h1>Watch SR</h1>
        <h2>Descrição</h2>
        <p>Um sistema completo para gerenciamento de Ordens de Serviço para Relojoeiros. Mantenha suas demandas organizadas, otimize seu fluxo de trabalho e priorize as tarefas de seus clientes com facilidade. Com o Watch SR você pode:</p>
        <h4>Cadastrar e controlar os seus Clientes</h4>
        <p>Nome, telefone, endereço, e-mail e CPF, sendo somente o Nome obrigatório.</p>
        <h4>Registrar e acompanhar o Status de cada Ordem de Serviço</h4>
        <p>Número de OS personalizado, Data de Cadastro personalizada (para serviços arquivados ou em andamento), Lista de Relógios que serão reparados (Marca, Modelo e Descrição do Serviço), Observações, e Status corrente da OS com Data de Previsão.<br />
            Aqui vale ressaltar a importância do Status, pois ele define todo o fluxo de trabalho. Cada OS pode assumir os seguintes status: <br />
        </p>
        <ul>
            <li>Nova OS - Permite cadastrar a Data de Previsão para Aprovação do Orçamento</li>
            <li>Orçamento aprovado</li>
            <li>Orçamento rejeitado</li>
            <li>Aguardando início - Permite cadastrar a Data de Previsão para o começo dos trabalhos.</li>
            <li>Aguardando peças - Permite cadastrar a Data de Previsão para chegada de peças encomendadas em fabricantes ou fornituras.</li>
            <li>Serviço em andamento - Permite cadastrar a Data de Previsão para conclusão do serviço.</li>
            <li>Serviço finalizado</li>
            <li>Aguardando retirada - Permite cadastrar a Data de Previsão para retirada dos relógios pelo cliente.</li>
            <li>Pagamento efetuado</li>
            <li>OS encerrada</li>
        </ul>
        <p>As Datas de Previsão são monitoradas, e o sistema emitirá alertas quando elas estiverem prestes a vencer ou quando elas já estiverem vencidas.</p>
        <h2>Sobre valores</h2>
        <p>O Watch SR é um SaaS (Software as a Service). Ou seja, ele requer uma assinatura periódica.<br />
            Porém, por ainda estar em estágio de refinamento, será oferecido um período de teste gratuito de 60 dias para os primeiros usuários. Após esse período, será necessário assinar um plano para continuar utilizando o sistema.<br />
            Aproveite essa "degustação" para avaliar o sistema e contribuir com críticas e sugestões de melhoria através de nosso <router-link to="/contact">Formulário de Contato</router-link>.<br />
        </p>
        <h2>Pré-requisitos</h2>
        <ul>
            <li>Windows 10 ou superior (32 ou 64-bit)</li>
            <li>.NET 8 Runtime (você terá a opção de instalar durante o setup)</li>
            <li>Conexão com a internet para atualizações e sincronização de dados</li>
        </ul>
        <a v-if="isAuthenticated" href="/downloads/setup.exe" class="download-button">Baixar Agora</a>
        <p v-else class="auth-required-notice">
          Para baixar o instalador, você precisa se cadastrar ou se autenticar.
          <router-link to="/auth">Faça login ou crie uma conta</router-link> para continuar.
        </p>
        <h2>Sugestões de Fornituras e Serviços Relacionados</h2>
        <p>Você, profissional relojoeiro, precisa de novas ferramentas, maquinário ou peças de reposição para relógios mais antigos? Veja a seguir algumas sugestões para facilitar o seu trabalho.</p>
        <!-- Google AdSense ad unit -->
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-4013551925638100"
             data-ad-slot="6773427561"
             data-ad-format="auto"
             data-full-width-responsive="true">
             <div class="ad-fallback" style="text-align: center; color: #999; padding: 20px; border: 1px dashed #ccc;">
                <small>Espaço destinado a parceiros e fornituras.</small>
             </div>
        </ins>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { authService } from '../service/authService'
import { useHead } from '@unhead/vue'

const isAuthenticated = ref(authService.isAuthenticated())

onMounted(() => {
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.error("AdSense error:", e);
    }
})

useHead({
  title: 'Watch SR - ibpsys',
  meta: [
    { name: 'description', content: 'Conheça o Watch SR, um sistema completo para gerenciamento de Ordens de Serviço para Relojoeiros. Mantenha suas demandas organizadas, otimize seu fluxo de trabalho e priorize seus atendimentos com facilidade.' },
    { property: 'og:title', content: 'Watch SR - ibpsys' },
    { property: 'og:description', content: 'Conheça o Watch SR, um sistema completo para gerenciamento de Ordens de Serviço para Relojoeiros. Mantenha suas demandas organizadas, otimize seu fluxo de trabalho e priorize seus atendimentos com facilidade.' },
    { name: 'keywords', content: 'Watch SR, sistema de ordens de serviço, relojoeiros, gerenciamento de demandas, otimização de fluxo de trabalho, organização de tarefas' }
  ]
})
</script>

<style scoped>
h2, h3, h4, p {
  text-align: justify;
}

.auth-required-notice {
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  background-color: #fff8e1;
  border-left: 4px solid #f59e0b;
  border-radius: 4px;
  color: #555;
  font-size: 0.95rem;
}

.auth-required-notice a {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
}

.auth-required-notice a:hover {
  text-decoration: underline;
}

.adsbygoogle {
  min-height: 250px;
  margin: 20px 0;
  background-color: #fafafa;
  display: block;
}
</style>
