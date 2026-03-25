<template>
  <div class="home">
    <!-- Section 1: Company Description -->
    <section class="company-section">
      <div class="container">
        <h1>Bem vindo à ibpsys</h1>
        <p align="left">
          Meu nome é Ivan Bonora Prado e sou o fundador da ibpsys, minha Microempresa Individual.<br />
          Minha visão: criar soluções inovadoras e de alta qualidade para empresas de todos os tamanhos, 
          atendendo a demanda dos usuários de maneira rápida, eficiente, personalizada e simples.<br />
          Minha missão: agir com ética e transparência, oferecendo o melhor custo-benefício possível.
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
              Uma aplição voltada para o gerenciamento de Ordens de Serviço para Relojoeiros, ajudando-os a organizar, otimizar e priorizar as demandas de seus clientes.
            </p>
            <router-link to="/products" class="product-link">Saiba Mais</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
