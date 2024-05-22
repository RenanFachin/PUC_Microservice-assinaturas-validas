import { Prisma, Pagamento as PrismaPagamento } from '@prisma/client'
import { UniqueEntityCodigo } from 'src/core/entities/unique-entity-codigo'
import { Pagamento } from 'src/domain/entities/pagamentos'

export class PrismaPagamentoMapper {
  static toDomain(raw: PrismaPagamento): Pagamento {
    return Pagamento.create(
      {
        codAssinatura: raw.codAssinatura,
        valorPago: raw.valorPago,
        dataPagamento: raw.dataPagamento,
      },
      new UniqueEntityCodigo(raw.id),
    )
  }

  static toPrisma(pagamento: Pagamento): Prisma.PagamentoUncheckedCreateInput {
    return {
      id: pagamento.codigo.toString(),
      codAssinatura: pagamento.codAssinatura,
      valorPago: pagamento.valorPago,
      dataPagamento: pagamento.dataPagamento,
    }
  }
}
