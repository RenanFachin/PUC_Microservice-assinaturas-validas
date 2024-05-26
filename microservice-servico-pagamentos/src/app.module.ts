import { Module } from '@nestjs/common'
import { PaymentsModule } from './infra/http/payments/payments.module'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    PaymentsModule,
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'hero',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'payment-microservices',
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
