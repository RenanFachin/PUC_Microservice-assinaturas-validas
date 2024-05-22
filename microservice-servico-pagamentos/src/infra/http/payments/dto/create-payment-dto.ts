import { ApiProperty } from '@nestjs/swagger'

export class CreatePaymentDto {
  @ApiProperty({
    description: 'Código da assinatura',
    example: '59b085a4-6299-42fe-ad5d-7a411a9478e4',
  })
  codAssinatura: string

  @ApiProperty({
    description: 'Valor pago pela assinatura',
    example: 12,
  })
  valorPago: number
}

class PagamentoDto {
  @ApiProperty({
    description: 'Código da assinatura',
    example: '59b085a4-6299-42fe-ad5d-7a411a9478e4',
  })
  codAssinatura: string

  @ApiProperty({
    description: 'Valor pago',
    example: 12,
  })
  valorPago: number

  @ApiProperty({
    description: 'Data do pagamento',
    example: '2024-05-22T23:04:44.794Z',
  })
  dataPagamento: Date
}

export class PaymentResponseDto {
  @ApiProperty({ type: PagamentoDto })
  pagamento: PagamentoDto
}
