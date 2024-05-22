import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma-service'
import { PagamentoRepository } from '../../domain/application/repositories/pagamentos-repository'
import { PrismaPagamentoRepository } from './prisma/repositories/prisma-pagamento-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PagamentoRepository,
      useClass: PrismaPagamentoRepository,
    },
    PrismaPagamentoRepository,
  ],
  exports: [PrismaService, PagamentoRepository],
})
export class DatabaseModule {}
