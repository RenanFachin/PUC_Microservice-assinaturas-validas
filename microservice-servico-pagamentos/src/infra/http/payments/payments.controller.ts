import { Body, Controller, Post } from '@nestjs/common'
import { CreatePaymentUseCase } from 'src/domain/application/use-cases/create-payment'
import { PaymentPresenter } from 'src/infra/database/prisma/presenters/payment-presenter'
import { z } from 'zod'

const createPaymentBodySchema = z.object({
  codAssinatura: z.string(),
  valorPago: z.number(),
})

type CreatePaymentBodySchema = z.infer<typeof createPaymentBodySchema>

@Controller('/registrarpagamento')
export class PaymentsController {
  constructor(private createPayment: CreatePaymentUseCase) {}

  @Post()
  async create(@Body() body: CreatePaymentBodySchema) {
    const { codAssinatura, valorPago } = createPaymentBodySchema.parse(body)

    const result = await this.createPayment.execute({
      codAssinatura,
      valorPago,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { pagamento } = result.value

    return {
      pagamento: PaymentPresenter.toHTTP(pagamento),
    }
  }
}
