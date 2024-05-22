import { Pagamento } from 'src/domain/entities/pagamentos'
import { PagamentoRepository } from '../repositories/pagamentos-repository'
import { Either, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'

interface CreatePaymentRequest {
  codAssinatura: string
  valorPago: number
}

type CreatePaymentUseCaseResponse = Either<
  null,
  {
    pagamento: Pagamento
  }
>

@Injectable()
export class CreatePaymentUseCase {
  constructor(private pagamentoRepository: PagamentoRepository) {}

  async execute({
    codAssinatura,
    valorPago,
  }: CreatePaymentRequest): Promise<CreatePaymentUseCaseResponse> {
    const novoPagamento = Pagamento.create({
      codAssinatura,
      valorPago,
      dataPagamento: new Date(),
    })

    const pagamento = await this.pagamentoRepository.create(novoPagamento)

    return right({ pagamento })
  }
}
