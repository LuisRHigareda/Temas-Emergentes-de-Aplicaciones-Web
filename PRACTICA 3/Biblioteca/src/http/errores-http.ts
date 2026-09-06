import type { ErrorRequestHandler } from 'express';

import type { ErrorResponseDto } from '../contrato/prestamo-response.dto.js';
import { EjemplarPrestadoError } from '../errores/ejemplar-prestado.error.js';

export class ValidacionError extends Error {
  constructor(public readonly detalles: string[]) {
    super('Datos de entrada invalidos');
    this.name = 'ValidacionError';
  }
}

export const manejarErrores: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  if (err instanceof ValidacionError) {
    const error: ErrorResponseDto = {
      error: 'VALIDACION_ERROR',
      mensaje: err.message,
      detalles: err.detalles,
    };

    res.status(400).json(error);
    return;
  }

  if (err instanceof EjemplarPrestadoError) {
    const error: ErrorResponseDto = {
      error: 'EJEMPLAR_PRESTADO',
      mensaje: err.message,
    };

    res.status(409).json(error);
    return;
  }

  const error: ErrorResponseDto = {
    error: 'ERROR_INTERNO',
    mensaje: 'Ocurrio un error interno en el servidor',
  };

  res.status(500).json(error);
};