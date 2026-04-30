import type { AxiosResponse } from 'axios'
import apiClient from './api'

interface ApiPayload {
  status?: boolean
  Status?: boolean
  mensagem?: string
  Mensagem?: string
  dados?: PaymentInfoData | null
  Dados?: PaymentInfoData | null
}

interface PaymentPlan {
  [key: string]: unknown
}

interface PaymentInfoData {
  nomeProduto?: string
  productName?: string
  planos?: PaymentPlan[]
  plans?: PaymentPlan[]
  emailComprovante?: string
  receiptEmail?: string
  email?: string
}

interface UnwrappedResponse {
  dados: PaymentInfoData | null
  mensagem: string
  status: boolean
}

interface PaymentInfoResult {
  productName: string
  plans: PaymentPlan[]
  receiptEmail: string
  mensagem: string
}

function unwrapResponse(response: AxiosResponse<ApiPayload>): UnwrappedResponse {
  const payload = response?.data ?? {}
  const status = payload.status ?? payload.Status ?? true
  const mensagem = payload.mensagem ?? payload.Mensagem ?? ''
  const dados = payload.dados ?? payload.Dados ?? null

  if (!status) {
    throw new Error(mensagem || 'Nao foi possivel processar a solicitacao de pagamento.')
  }

  return { dados, mensagem, status }
}

export const paymentService = {
  async getPaymentInfo(productId: string | number): Promise<PaymentInfoResult> {
    const response = await apiClient.get<ApiPayload>(`/api/PaymentPlan/options/${productId}`)
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