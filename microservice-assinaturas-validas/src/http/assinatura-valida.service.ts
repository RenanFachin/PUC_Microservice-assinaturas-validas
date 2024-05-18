import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'
import { CacheRepository } from 'src/infra/cache/cache-repository'

@Injectable()
export class AssinaturaValidaService {
  constructor(
    private httpService: HttpService,
    private readonly cacheRepository: CacheRepository,
  ) {}

  async getStatusFromCadastramentoService(codass: string): Promise<string> {
    const url = `http://localhost:3333/verifica/${codass}`

    try {
      const { data } = await lastValueFrom(this.httpService.get(url))

      console.log(`Status do serviço principal para ${codass}: ${data.status}`)

      return data.status // 'ativa' ou 'cancelada'
    } catch (error) {
      console.error('Erro ao chamar o serviço principal:', error.message) // Adicione esta linha para mais detalhes do erro
      throw new Error('Erro ao verificar a assinatura no serviço principal')
    }
  }

  async verificarValidade(codass: string): Promise<{ status: string }> {
    const validade = await this.cacheRepository.get(codass)

    console.log(`Status do cache para ${codass}: ${validade}`)

    if (validade !== null) {
      const status = validade === 'true' ? 'ativa' : 'cancelada'
      return { status }
    }

    const status = await this.getStatusFromCadastramentoService(codass)
    await this.cacheRepository.set(
      codass,
      status === 'ativa' ? 'true' : 'false',
    )

    console.log(`Status armazenado no cache para ${codass}: ${status}`)
    return { status }
  }
}
