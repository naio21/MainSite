<template>
  <div class="payment-page">
    <div class="payment-container">
      <header class="payment-header">
        <h1>Pagamento via PIX</h1>
        <p>
          Escolha a modalidade desejada e substitua os espaços abaixo pelos dados oficiais da sua cobrança
          do Nubank Empresas.
        </p>
      </header>

      <section class="payment-grid">
        <article
          v-for="plan in plans"
          :key="plan.name"
          class="payment-card"
        >
          <h2>{{ plan.name }}</h2>
          <p class="plan-description">{{ plan.description }}</p>

          <div class="qr-placeholder" aria-label="Espaço reservado para QR Code PIX">
            <span>Adicionar QR Code PIX</span>
          </div>

          <div class="pix-copy-section">
            <label :for="`pix-${plan.slug}`">Pix Copia e Cola</label>
            <textarea
              :id="`pix-${plan.slug}`"
              rows="4"
              readonly
              :value="plan.pixPlaceholder"
            ></textarea>
          </div>
        </article>
      </section>

      <p class="payment-note">
        Após preencher os códigos definitivos, esta página poderá ser compartilhada apenas com usuários autenticados.
      </p>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'Payment' })

const plans = [
  {
    name: 'Mensal',
    slug: 'mensal',
    description: 'Plano com renovação mensal.',
    pixPlaceholder: 'COLE AQUI O PIX COPIA E COLA DO PLANO MENSAL'
  },
  {
    name: 'Semestral',
    slug: 'semestral',
    description: 'Plano com renovação a cada 6 meses.',
    pixPlaceholder: 'COLE AQUI O PIX COPIA E COLA DO PLANO SEMESTRAL'
  },
  {
    name: 'Anual',
    slug: 'anual',
    description: 'Plano com renovação anual.',
    pixPlaceholder: 'COLE AQUI O PIX COPIA E COLA DO PLANO ANUAL'
  }
]
</script>

<style scoped>
.payment-page {
  padding: 2rem 1rem 3rem;
}

.payment-container {
  max-width: 1100px;
  margin: 0 auto;
}

.payment-header {
  margin-bottom: 2rem;
}

.payment-header h1 {
  margin-bottom: 0.5rem;
}

.payment-header p,
.payment-note,
.plan-description {
  color: rgba(255, 255, 255, 0.75);
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.payment-card {
  padding: 1.25rem;
  border: 1px solid rgba(100, 108, 255, 0.25);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.payment-card h2 {
  margin-bottom: 0.5rem;
}

.qr-placeholder {
  min-height: 210px;
  margin: 1rem 0;
  border: 2px dashed rgba(100, 108, 255, 0.4);
  border-radius: 12px;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 1rem;
  background: rgba(100, 108, 255, 0.05);
  color: #9ca3ff;
  font-weight: 600;
}

.pix-copy-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pix-copy-section label {
  font-weight: 600;
}

.pix-copy-section textarea {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #444;
  background: #111827;
  color: inherit;
  padding: 0.85rem;
  resize: vertical;
  font-family: inherit;
}

.payment-note {
  margin-top: 1.5rem;
}

@media (prefers-color-scheme: light) {
  .payment-header p,
  .payment-note,
  .plan-description {
    color: #555;
  }

  .payment-card {
    background: #ffffff;
    border-color: rgba(100, 108, 255, 0.2);
  }

  .pix-copy-section textarea {
    background: #f9fafb;
    border-color: #d1d5db;
    color: #213547;
  }
}
</style>
