import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import {
  PagamentoServicoCadastramentoEvent,
  PagamentoServicoAssinaturaValidaEvent,
} from './event.types'

@EventsHandler(PagamentoServicoCadastramentoEvent)
export class PagamentoServicoCadastramentoHandler
  implements IEventHandler<PagamentoServicoCadastramentoEvent>
{
  handle(event: PagamentoServicoCadastramentoEvent): void {
    console.log('Evento de registro de pagamento:', event)
  }
}

@EventsHandler(PagamentoServicoAssinaturaValidaEvent)
export class PagamentoServicoAssinaturaValidaHandler
  implements IEventHandler<PagamentoServicoAssinaturaValidaEvent>
{
  handle(event: PagamentoServicoAssinaturaValidaEvent): void {
    console.log('Evento de validade da assinatura:', event)
  }
}
