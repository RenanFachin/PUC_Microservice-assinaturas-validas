import { Module } from '@nestjs/common'
import { PaymentsController } from './payments.controller'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreatePaymentUseCase } from 'src/domain/application/use-cases/create-payment'

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentsController],
  providers: [CreatePaymentUseCase],
})
export class PaymentsModule {}
