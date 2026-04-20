<template>
  <div class="payment-page">
    <div class="payment-container">
      <header class="payment-header">
        <h1>{{ productName ? `Pagamento - ${productName}` : 'Pagamento via PIX' }}</h1>
        <p>
          Escolha o plano desejado e clique no botão para abrir a página de pagamento do Nubank.
          Após concluir o pagamento, envie o comprovante para o e-mail informado abaixo.
        </p>
      </header>

      <section class="receipt-info-card">
        <div>
          <h2>Envio do comprovante</h2>
          <p class="payment-note">Após concluir o pagamento, envie o comprovante para o e-mail abaixo.</p>
        </div>

        <div class="receipt-email-section">
          <label for="receipt-email">E-mail para envio do comprovante</label>
          <input
            id="receipt-email"
            type="email"
            :value="receiptEmail"
            readonly
          >
          <a
            v-if="receiptEmail"
            class="email-action"
            :href="`mailto:${receiptEmail}?subject=Comprovante de Pagamento`"
          >
            Enviar comprovante por e-mail
          </a>
        </div>
      </section>

      <p v-if="isLoading" class="status-message">Carregando informações de pagamento...</p>
      <p v-else-if="loadError" class="status-message error">{{ loadError }}</p>

      <section v-else class="payment-grid">
        <article
          v-for="plan in normalizedPlans"
          :key="plan.slug"
          class="payment-card"
        >
          <h2>{{ plan.name }}</h2>
          <p class="plan-description">{{ plan.description }}</p>
          <p v-if="plan.price" class="plan-price">{{ plan.price }}</p>

          <a
            v-if="plan.paymentUrl"
            :href="plan.paymentUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="pay-button"
          >
            Pagar
          </a>
          <p v-else class="status-message">Link de pagamento indisponível no momento.</p>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import paymentService from '../service/paymentService'

defineOptions({ name: 'Payment' })

const route = useRoute()
const router = useRouter()

const productName = ref('')
const plans = ref([])
const receiptEmail = ref('')
const isLoading = ref(true)
const loadError = ref('')

const normalizedPlans = computed(() => {
  return plans.value.map((plan, index) => ({
    slug: plan.slug || plan.nome?.toLowerCase() || `plano-${index + 1}`,
    name: plan.name || plan.nome || 'Plano',
    description: plan.description || plan.descricao || 'Pagamento via PIX.',
    price: plan.price || plan.valor || '',
    paymentUrl: plan.paymentUrl || plan.linkPagamento || plan.url || ''
  }))
})

async function loadPaymentInfo() {
  const productId = route.query.id

  if (!productId) {
    router.replace({ name: 'NotFound' })
    return
  }

  isLoading.value = true
  loadError.value = ''

  try {
    const response = await paymentService.getPaymentInfo(productId)
    productName.value = response.productName || ''
    plans.value = response.plans || []
    receiptEmail.value = response.receiptEmail || ''
  } catch (error) {
    if (error.response?.status === 404) {
      router.replace({ name: 'NotFound' })
      return
    }
    loadError.value = error.message || 'Erro ao carregar os dados de pagamento.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadPaymentInfo()
})
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
  margin-bottom: 1.5rem;
}

.payment-header h1 {
  margin-bottom: 0.5rem;
}

.payment-header p,
.payment-note,
.plan-description {
  color: rgba(255, 255, 255, 0.75);
}

.receipt-info-card {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid rgba(100, 108, 255, 0.25);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
}

.receipt-email-section {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1rem;
}

.receipt-email-section input {
  width: 100%;
  border-radius: 10px;
  border: 1px solid #444;
  background: #111827;
  color: inherit;
  padding: 0.85rem;
  font-family: inherit;
}

.email-action,
.pay-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border: none;
  border-radius: 8px;
  padding: 0.65rem 1.4rem;
  background: #646cff;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.email-action:hover,
.pay-button:hover {
  background: #535bf2;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.payment-card h2 {
  margin-bottom: 0;
}

.plan-price {
  font-weight: 700;
  font-size: 1.25rem;
  color: #9ca3ff;
}

.status-message {
  margin-top: 1rem;
}

.status-message.error {
  color: #f87171;
}

.status-message.success {
  color: #4ade80;
}

@media (prefers-color-scheme: light) {
  .payment-header p,
  .payment-note,
  .plan-description {
    color: #555;
  }

  .payment-card,
  .receipt-info-card {
    background: #ffffff;
    border-color: rgba(100, 108, 255, 0.2);
  }

  .receipt-email-section input {
    background: #f9fafb;
    border-color: #d1d5db;
    color: #213547;
  }
}
</style>
