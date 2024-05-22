import { Pagamento } from 'src/domain/entities/pagamentos'

export abstract class PagamentoRepository {
  abstract create(pagamento: Pagamento): Promise<Pagamento>
}
