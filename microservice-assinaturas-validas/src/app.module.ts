import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { CacheModule } from './infra/cache/cache.module'
import { AssinaturaValidasController } from './http/assinatura-valida.controller'
import { AssinaturaValidaService } from './http/assinatura-valida.service'
import { EnvModule } from './infra/env/env.module'

@Module({
  imports: [HttpModule, CacheModule, EnvModule],
  controllers: [AssinaturaValidasController],
  providers: [AssinaturaValidaService],
})
export class AppModule {}
