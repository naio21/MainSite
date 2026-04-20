import apiClient from './api'

function unwrapResponse(response) {
  const payload = response?.data ?? {}
  const status = payload.status ?? payload.Status ?? true
  const mensagem = payload.mensagem ?? payload.Mensagem ?? ''
  const dados = payload.dados ?? payload.Dados ?? null

  if (!status) {
    throw new Error(mensagem || 'Não foi possível processar a solicitação de pagamento.')
  }

  return { dados, mensagem, status }
}

export const paymentService = {
  async getPaymentInfo(productId) {
    const response = await apiClient.get(`/api/PaymentPlan/options/${productId}`)
    const { dados, mensagem } = unwrapResponse(response)

    return {
      productName: dados?.nomeProduto ?? dados?.productName ?? '',
      plans: dados?.planos ?? dados?.plans ?? [],
      receiptEmail: dados?.emailComprovante ?? dados?.receiptEmail ?? dados?.email ?? '',
      mensagem
    }
  }
}

export default paymentService
