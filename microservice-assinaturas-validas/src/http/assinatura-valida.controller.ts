import { Controller, Get, Param } from '@nestjs/common'
import { AssinaturaValidaService } from './assinatura-valida.service'

@Controller('assinaturasvalidas')
export class AssinaturaValidaController {
  constructor(
    private readonly assinaturaValidaService: AssinaturaValidaService,
  ) {}

  @Get(':codass')
  async verificarValidade(
    @Param('codass') codass: string,
  ): Promise<{ status: string }> {
    return this.assinaturaValidaService.verificarValidade(codass)
  }
}
