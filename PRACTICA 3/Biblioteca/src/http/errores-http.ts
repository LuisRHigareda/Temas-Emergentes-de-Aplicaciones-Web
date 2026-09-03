export class ValidacionError extends Error {
  constructor(public readonly detalles: string[]) {
    super('Datos de entrada invalidos');
    this.name = 'ValidacionError';
  }
}