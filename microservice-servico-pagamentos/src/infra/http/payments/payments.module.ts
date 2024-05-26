import { Module } from '@nestjs/common'
import { PaymentsController } from './payments.controller'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreatePaymentUseCase } from 'src/domain/application/use-cases/create-payment'
import { CqrsModule } from '@nestjs/cqrs'
import { ClientsModule, Transport, KafkaOptions } from '@nestjs/microservices'
import {
  PagamentoServicoAssinaturaValidaHandler,
  PagamentoServicoCadastramentoHandler,
} from '../events/pagamento-servico-cadastramento.handler'
import { Partitioners } from 'kafkajs'

const kafkaOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'hero',
      brokers: ['localhost:9092'],
    },
    producer: {
      createPartitioner: Partitioners.LegacyPartitioner,
    },
  },
}

@Module({
  imports: [
    DatabaseModule,
    CqrsModule,
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        ...kafkaOptions,
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [
    CreatePaymentUseCase,
    PagamentoServicoCadastramentoHandler,
    PagamentoServicoAssinaturaValidaHandler,
  ],
})
export class PaymentsModule {}
