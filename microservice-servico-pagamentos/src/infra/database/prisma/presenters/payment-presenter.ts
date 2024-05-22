import { Pagamento } from 'src/domain/entities/pagamentos'

export class PaymentPresenter {
  static toHTTP(pagamento: Pagamento) {
    return {
      codAssinatura: pagamento.codAssinatura,
      valorPago: pagamento.valorPago,
      dataPagamento: pagamento.dataPagamento,
    }
  }
}

export class CreatePaymentPresenter {
  static toHTTP(pagamento: Pagamento) {
    return {
      id: pagamento.codigo.toString(),
      codAssinatura: pagamento.codAssinatura,
      valorPago: pagamento.valorPago,
      dataPagamento: pagamento.dataPagamento,
    }
  }
}
