import { Entity } from 'src/core/entities/entity'
import { UniqueEntityCodigo } from 'src/core/entities/unique-entity-codigo'

export interface PagamentosProps {
  codAssinatura: string
  valorPago: number
  dataPagamento: Date
}

export class Pagamento extends Entity<PagamentosProps> {
  get codAssinatura() {
    return this.props.codAssinatura
  }

  get valorPago() {
    return this.props.valorPago
  }

  get dataPagamento() {
    return (this.props.dataPagamento = new Date())
  }

  static create(props: PagamentosProps, codigo?: UniqueEntityCodigo) {
    const pagamento = new Pagamento({ ...props }, codigo)

    return pagamento
  }
}
