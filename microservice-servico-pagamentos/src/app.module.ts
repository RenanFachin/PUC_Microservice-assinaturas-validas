import { Module } from '@nestjs/common'
import { PaymentsModule } from './infra/http/payments/payments.module'

@Module({
  imports: [PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
