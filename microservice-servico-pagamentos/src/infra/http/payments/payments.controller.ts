import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Inject,
} from '@nestjs/common'
import { CreatePaymentUseCase } from 'src/domain/application/use-cases/create-payment'
import { PaymentPresenter } from 'src/infra/database/prisma/presenters/payment-presenter'
import { z } from 'zod'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreatePaymentDto, PaymentResponseDto } from './dto/create-payment-dto'
import { ClientKafka } from '@nestjs/microservices'

const createPaymentBodySchema = z.object({
  codAssinatura: z.string(),
  valorPago: z.number(),
})

type CreatePaymentBodySchema = z.infer<typeof createPaymentBodySchema>

@ApiTags('pagamentos')
@Controller('/registrarpagamento')
export class PaymentsController {
  constructor(
    @Inject('PAYMENT_SERVICE') private clientKafka: ClientKafka,
    private createPayment: CreatePaymentUseCase,
  ) {}

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
      throw new BadRequestException(result.value.message)
    }

    const { pagamento } = result.value

    const paymentEvent = await this.createPayment.execute(pagamento)
    this.clientKafka.emit('payment.created', JSON.stringify(CreatePaymentDto))

    if (paymentEvent.isLeft()) {
      throw new BadRequestException()
    }

    console.log(paymentEvent.value.pagamento.toString())

    return {
      pagamento: PaymentPresenter.toHTTP(pagamento),
      paymentEvent,
    }
  }
}
