import { Body, Controller, Post } from '@nestjs/common'
import { CreatePaymentUseCase } from 'src/domain/application/use-cases/create-payment'
import { PaymentPresenter } from 'src/infra/database/prisma/presenters/payment-presenter'
import { z } from 'zod'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreatePaymentDto, PaymentResponseDto } from './dto/create-payment-dto'

const createPaymentBodySchema = z.object({
  codAssinatura: z.string(),
  valorPago: z.number(),
})

type CreatePaymentBodySchema = z.infer<typeof createPaymentBodySchema>

@ApiTags('pagamentos')
@Controller('/registrarpagamento')
export class PaymentsController {
  constructor(private createPayment: CreatePaymentUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Registra o pagamento' })
  @ApiBody({ type: CreatePaymentDto })
  @ApiResponse({
    status: 201,
    description: 'Pagamento registrado com sucesso!',
    type: PaymentResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
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
