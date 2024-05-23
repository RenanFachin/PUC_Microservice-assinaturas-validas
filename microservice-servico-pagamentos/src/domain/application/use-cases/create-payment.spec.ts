import { randomUUID } from 'crypto'
import { CreatePaymentUseCase } from './create-payment'
import { InMemoryPagamentosRepository } from 'test/repositories/in-memory-pagamentos-repositority'
import { InvalidPaymentValueError } from '@/core/errors/invalid-payment-value'

let inMemoryPagamentosRepository: InMemoryPagamentosRepository
let sut: CreatePaymentUseCase

describe('Create a client', () => {
  beforeEach(() => {
    inMemoryPagamentosRepository = new InMemoryPagamentosRepository()
    sut = new CreatePaymentUseCase(inMemoryPagamentosRepository)
  })

  it('should be able to register a payment', async () => {
    const pagamento = await sut.execute({
      codAssinatura: randomUUID(),
      valorPago: 10,
    })
    // console.log(cliente)

    if (pagamento.isRight()) {
      expect(pagamento.value?.pagamento.codigo).toBeTruthy()
      expect(inMemoryPagamentosRepository.pagamentos[0].codigo).toEqual(
        pagamento.value?.pagamento.codigo,
      )
    }
  })

  it('should not allow registering a payment with a negative value', async () => {
    const pagamento = await sut.execute({
      codAssinatura: randomUUID(),
      valorPago: -10,
    })

    expect(pagamento.isLeft()).toBeTruthy()

    if (pagamento.isLeft()) {
      expect(pagamento.value).toEqual(new InvalidPaymentValueError())
    }
  })
})
