<template>
  <div class="home">
    <!-- Section 1: Company Description -->
    <section class="company-section">
      <div class="container">
        <h1>Bem vindo à ibpsys</h1>
        <p align="left">
          Meu nome é Ivan Bonora Prado e sou o fundador da ibpsys, minha Microempresa Individual.<br />
          <strong>Minha visão:</strong> criar soluções inovadoras e de alta qualidade para empresas de todos os tamanhos, 
          atendendo a demanda dos usuários de maneira rápida, eficiente, personalizada e simples.<br />
          <strong>Minha missão:</strong> agir com ética e transparência, oferecendo o melhor custo-benefício possível.
        </p>
      </div>
    </section>
    <!-- Section 2: Product Showcase -->
    <section class="products-section">
      <div class="container">
        <h2>Meus Produtos</h2>
        <div class="products-grid">
          <div class="product-card">
            <div class="product-image">
              <img src="../../src/assets/watchsr.png" alt="Watch SR" class="minilogo">
            </div>
            <h3>Watch SR</h3>
            <p>
              Uma aplicação voltada para o gerenciamento de Ordens de Serviço para Relojoeiros, ajudando-os a organizar, otimizar e priorizar as demandas de seus clientes.
            </p>
            <router-link to="/watch-sr" class="product-link">Saiba Mais</router-link>
          </div>
        </div>
      </div>
    </section>
    <!-- Section 3: About Me -->
    <section class="about-section">
      <div class="container">
        <h1>Sobre Mim</h1>
        <p align="left">
          Apesar de ter obtido meu primeiro curso superior em Bacharelado de Engenharia Mecânica (Unicamp, 1995), nunca atuei na área.<br />
          Sou um "engenheiro não praticante".<br />
          Minha primeira oportunidade profissional foi oferecida há {{ yearsSinceMay1996 }} anos como Analista de Sistemas Sênior na ITAUSA, a <i>holding</i> controladora do Grupo Itaú.<br />
          Lá fui treinado pelas melhores Solution Providers parceiras da Microsoft, para desenvolver soluções de software voltadas à Superintendência de Contabilidade.<br />
          Graças a esse ponto de partida, acabei adotando a tecnologia Microsoft como minha principal <i>stack</i>, embora também tenha experiência com outras tecnologias e linguagens de programação.<br />
          Para me especializar cada vez mais, realizei mais dois cursos superiores: MBA em TI (FIAP, 2007) e CST em Análise e Desenvolvimento de Sistemas (Unifran, 2018).<br />
          Você pode conhecer mais sobre minha trajetória profissional e minhas qualificações na minha <a href='https://www.linkedin.com/in/naio21' target="_blank" rel="noopener noreferrer">página do LinkedIn</a>,
          ou através do meu currículo em <a href='/downloads/Ivan_Prado_CV.pdf'>português</a> ou <a href='/downloads/Ivan_Prado_Resume.pdf'>inglês</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'

defineOptions({ name: 'Home' })

function calculateYearsFromMay1996(): number {
  const startDate = new Date(1996, 4, 1)
  const now = new Date()
  const totalMonths =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth())
  return Math.max(0, Math.floor(totalMonths / 12))
}

const yearsSinceMay1996 = computed(() => calculateYearsFromMay1996())

useHead({
  title: 'Home - ibpsys',
  meta: [
    { name: 'description', content: 'Bem vindo à ibpsys, soluções inovadoras para empresas e profissionais autônomos.' },
    { property: 'og:title', content: 'Home - ibpsys' },
    { property: 'og:description', content: 'Bem vindo à ibpsys, soluções inovadoras para empresas e profissionais autônomos.' },
    { name: 'keywords', content: 'ibpsys, soluções, sistemas para relojoeiros, negócios, tecnologia, Microsoft .NET, Vue.js' }
  ]
})
</script>

<style scoped>
.about-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.about-section .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.about-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.about-section p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.about-section a {
  color: #e0d7ff;
  text-decoration: underline;
  font-weight: 600;
}

.about-section a:hover {
  color: #ffffff;
}
</style>
