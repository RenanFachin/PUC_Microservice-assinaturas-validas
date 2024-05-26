export class PagamentoServicoCadastramentoEvent {
  constructor(
    public readonly dataPagamento: Date,
    public readonly codass: string,
    public readonly valorPago: number,
  ) {}
}

export class PagamentoServicoAssinaturaValidaEvent {
  constructor(
    public readonly dataPagamento: Date,
    public readonly codass: string,
    public readonly valorPago: number,
  ) {}
}
