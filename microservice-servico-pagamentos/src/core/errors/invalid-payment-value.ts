import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidPaymentValueError extends Error implements UseCaseError {
  constructor() {
    super('Valor inserido não é válido')
  }
}
