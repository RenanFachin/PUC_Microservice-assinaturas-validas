import { Pagamento } from 'src/domain/entities/pagamentos'
import { PagamentoRepository } from '../repositories/pagamentos-repository'
import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidPaymentValueError } from '@/core/errors/invalid-payment-value'

interface CreatePaymentRequest {
  codAssinatura: string
  valorPago: number
}

type CreatePaymentUseCaseResponse = Either<
  InvalidPaymentValueError,
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
    if (valorPago < 0) {
      return left(new InvalidPaymentValueError())
    }

    const novoPagamento = Pagamento.create({
      codAssinatura,
      valorPago,
      dataPagamento: new Date(),
    })

    const pagamento = await this.pagamentoRepository.create(novoPagamento)

    return right({ pagamento })
  }
}
