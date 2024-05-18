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

  async getStatusFromCadastramentoService(codass: string): Promise<boolean> {
    const url = `http://localhost:3000/verifica/${codass}`

    try {
      const { data } = await lastValueFrom(this.httpService.get(url))
      return data.status === 'ativa'
    } catch (error) {
      throw new Error('Erro ao verificar a assinatura no serviço principal')
    }
  }

  async verificarValidade(codass: string): Promise<boolean> {
    const validade = await this.cacheRepository.get(codass)

    if (validade !== null) {
      return validade === 'true'
    }

    const status = await this.getStatusFromCadastramentoService(codass)
    await this.cacheRepository.set(codass, status ? 'true' : 'false')
    return status
  }
}
