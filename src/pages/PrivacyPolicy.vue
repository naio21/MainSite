<template>
  <section class="legal-page">
    <button class="back-button" type="button" @click="goBack">Voltar</button>

    <article class="content" aria-labelledby="privacy-title">
      <h1 id="privacy-title">Política de Privacidade</h1>

      <p>
        Esta Política de Privacidade descreve como a <strong>ibpsys</strong> coleta, utiliza, armazena e compartilha
        seus dados pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD – Lei nº
        13.709/2018)</strong>.
      </p>

      <h2>1. Dados Coletados</h2>
      <p>Coletamos as seguintes categorias de dados pessoais, conforme necessário para a prestação dos nossos serviços:</p>
      <ul>
        <li><strong>Dados de cadastro:</strong> nome completo, endereço de e-mail, CPF/CNPJ.</li>
        <li><strong>Dados de clientes dos nossos produtos:</strong> nome, telefone, endereço, e-mail e CPF dos clientes cadastrados pelo usuário em nossos sistemas.</li>
        <li><strong>Dados de uso:</strong> informações de acesso, datas de login e atividade dentro da plataforma.</li>
        <li><strong>Dados de pagamento:</strong> não armazenamos dados de pagamento. As transações via PIX são processadas diretamente pelo Nubank.</li>
        <li><strong>Dados de navegação:</strong> cookies e identificadores utilizados pelo Google AdSense, mediante consentimento prévio.</li>
      </ul>

      <h2>2. Finalidade e Base Legal</h2>
      <table class="legal-table">
        <thead>
          <tr>
            <th>Dado</th>
            <th>Finalidade</th>
            <th>Base Legal (LGPD Art. 7)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-mail, CPF/CNPJ</td>
            <td>Criação e gestão de conta, autenticação</td>
            <td>Execução de contrato (inc. V)</td>
          </tr>
          <tr>
            <td>Dados de clientes nos produtos</td>
            <td>Prestação do serviço contratado</td>
            <td>Execução de contrato (inc. V)</td>
          </tr>
          <tr>
            <td>Dados de uso</td>
            <td>Segurança, prevenção de fraude, suporte</td>
            <td>Legítimo interesse (inc. IX)</td>
          </tr>
          <tr>
            <td>Cookies de publicidade</td>
            <td>Exibição de anúncios via Google AdSense</td>
            <td>Consentimento (inc. I)</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Compartilhamento de Dados</h2>
      <p>Seus dados não são vendidos ou cedidos a terceiros. Compartilhamos informações apenas com:</p>
      <ul>
        <li><strong>Nubank:</strong> processamento de pagamentos via PIX.</li>
        <li><strong>Google AdSense:</strong> exibição de publicidade, somente após seu consentimento. Consulte a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidade do Google</a>.</li>
        <li><strong>Autoridades públicas:</strong> quando exigido por lei ou ordem judicial.</li>
      </ul>

      <h2>4. Seus Direitos (LGPD Art. 18)</h2>
      <p>Você tem direito a, a qualquer momento:</p>
      <ul>
        <li>Confirmar a existência de tratamento de seus dados;</li>
        <li>Acessar os dados que mantemos sobre você;</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
        <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
        <li>Solicitar a portabilidade dos seus dados;</li>
        <li>Revogar o consentimento dado para cookies de publicidade;</li>
        <li>Solicitar a exclusão completa da sua conta e dados associados (veja nossa <router-link to="/data-retention">Política de Retenção de Dados</router-link>).</li>
      </ul>
      <p>
        Para exercer qualquer um desses direitos, fale conosco através do nosso
        <router-link to="/contact">Formulário de Contato</router-link>.
      </p>

      <h2>5. Cookies</h2>
      <p>Utilizamos dois tipos de cookies:</p>
      <ul>
        <li><strong>Cookies essenciais:</strong> necessários para autenticação e funcionamento da plataforma. Não requerem consentimento.</li>
        <li><strong>Cookies de publicidade (Google AdSense):</strong> utilizados para exibir anúncios relevantes. Serão ativados somente após seu consentimento explícito, concedido através do aviso de cookies exibido ao acessar o site.</li>
      </ul>

      <h2>6. Retenção de Dados</h2>
      <p>Os prazos de retenção de dados estão detalhados em nossa <router-link to="/data-retention">Política de Retenção de Dados</router-link>.</p>

      <h2>7. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou
        divulgação, incluindo autenticação com token e comunicação criptografada via HTTPS.
      </p>

      <h2>8. Contato e Encarregado de Dados (DPO)</h2>
      <p>
        Para dúvidas, solicitações ou reclamações relacionadas ao tratamento de dados pessoais, fale conosco através
        do nosso <router-link to="/contact">Formulário de Contato</router-link>.
      </p>
      <p>
        Você também pode registrar reclamações perante a <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong>:
        <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">www.gov.br/anpd</a>.
      </p>

      <p class="effective-date">Esta política é efetiva a partir de 13 de abril de 2026 e pode ser atualizada periodicamente. Alterações relevantes serão comunicadas pelo site.</p>
    </article>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'

const router = useRouter()

function goBack() {
  router.back()
}

useHead({
  title: 'Política de Privacidade - ibpsys',
  meta: [
    { name: 'description', content: 'Leia a política de privacidade da ibpsys, garantindo a proteção de seus dados e informações pessoais.' },
    { property: 'og:title', content: 'Política de Privacidade - ibpsys' },
    { property: 'og:description', content: 'Leia a política de privacidade da ibpsys, garantindo a proteção de seus dados e informações pessoais.' },
    { name: 'keywords', content: 'ibpsys, privacidade, política de privacidade, proteção de dados, segurança, informações pessoais' }
  ]
})
</script>

<style scoped>
.legal-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
}

.back-button {
  border: 1px solid #d0d7de;
  border-radius: 8px;
  background: #fff;
  color: #1f2937;
  padding: 0.55rem 0.9rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.back-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.content {
  margin-top: 1.2rem;
  color: #444;
  line-height: 1.75;
}

.content h1 {
  margin: 0 0 1.25rem;
  color: #1f2937;
  font-size: clamp(1.6rem, 2.4vw, 2rem);
  line-height: 1.2;
}

.content h2 {
  margin: 2rem 0 0.8rem;
  color: #1f2937;
  font-size: 1.2rem;
}

.content p {
  margin: 0 0 1rem;
}

.content ul {
  margin: 0 0 1.2rem;
  padding-left: 1.2rem;
}

.content li {
  margin-bottom: 0.7rem;
}

.content a {
  color: #0f5ca8;
  text-decoration: underline;
}

.effective-date {
  margin-top: 1.4rem;
  font-size: 0.92rem;
  color: #6b7280;
}

.legal-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 1.2rem;
  font-size: 0.92rem;
}

.legal-table th,
.legal-table td {
  border: 1px solid #d1d5db;
  padding: 0.6rem 0.8rem;
  text-align: left;
  vertical-align: top;
}

.legal-table thead tr {
  background-color: #f3f4f6;
}

.legal-table tbody tr:nth-child(even) {
  background-color: #f9fafb;
}
</style>
