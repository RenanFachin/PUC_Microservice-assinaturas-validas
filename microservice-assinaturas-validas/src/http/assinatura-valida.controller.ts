import { Controller, Get, Param } from '@nestjs/common'
import { AssinaturaValidaService } from './assinatura-valida.service'

@Controller()
export class AssinaturaValidasController {
  constructor(
    private readonly assinaturasValidasService: AssinaturaValidaService,
  ) {}

  @Get(':codass')
  async verificarValidade(@Param('codass') codass: string): Promise<boolean> {
    return this.assinaturasValidasService.verificarValidade(codass)
  }
}
