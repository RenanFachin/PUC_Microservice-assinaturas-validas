import { PagamentoRepository } from 'src/domain/application/repositories/pagamentos-repository'
import { Pagamento } from 'src/domain/entities/pagamentos'

export class InMemoryPagamentosRepository implements PagamentoRepository {
  public pagamentos: Pagamento[] = []

  async create(pagamento: Pagamento): Promise<Pagamento> {
    this.pagamentos.push(pagamento)

    return pagamento
  }
}
