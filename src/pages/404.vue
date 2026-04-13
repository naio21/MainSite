<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <div class="not-found-code">404</div>
      <h1>Página Não Encontrada</h1>
      <p>A página que você está procurando não existe ou foi removida.</p>
      <router-link to="/" class="redirect-button">Voltar para o Início</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.not-found-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 480px;
  width: 100%;
  padding: 3rem 2rem;
  text-align: center;
  color: #333;
}

.not-found-code {
  font-size: 6rem;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.75rem;
  margin: 0 0 1rem;
  color: #333;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.redirect-button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.redirect-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
