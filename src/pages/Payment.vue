<template>
  <div class="payment-page">
    <div class="payment-container">
      <header class="payment-header">
        <h1>{{ productName ? `Renovação - ${productName}` : 'Pagamento via PIX' }}</h1>
        <p>
          Escolha o plano desejado e clique no botão para abrir a página de pagamento via PIX do Nubank.
        </p>
      </header>

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
      <br />
      <section class="receipt-info-card">
        <div>
          <h2>Importante!</h2>
          <p class="payment-note">
            Como a cobrança via PIX é terceirizada pela instituição financeira, o processo de reconhecimento do pagamento e renovação da assinatura é manual.<br/>
            Para poder identificar o pagador e renovar a data de vencimento o mais rápido possível, solicitamos que envie o comprovante para 
          <a
            v-if="receiptEmail"
            :href="`mailto:${receiptEmail}?subject=Comprovante de Pagamento`"
          >
            {{receiptEmail}}
          </a>, informando também seu documento cadastrado (CPF/CNPJ) ou o e-mail utilizado para login.
          </p>
        </div>
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
    receiptEmail.value = response.receiptEmail || 'ibpsys@ibpsys.com.br'
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
  text-align: justify;
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
  text-align: justify;
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

.pay-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

.pay-button:hover {
  background: #535bf2;
}

.status-message.error {
  color: #f87171;
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
}
</style>
