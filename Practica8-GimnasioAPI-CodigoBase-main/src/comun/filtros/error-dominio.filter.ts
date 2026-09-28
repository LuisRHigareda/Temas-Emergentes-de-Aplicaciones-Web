import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import type { Request, Response } from 'express';

import {
  CupoLlenoError,
  ErrorDominio,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from '../../inscripciones/dominio/errores.js';

@Catch(ErrorDominio)
export class ErrorDominioFilter implements ExceptionFilter {
  catch(exception: ErrorDominio, host: ArgumentsHost) {
    const contexto = host.switchToHttp();

    const response = contexto.getResponse<Response>();
    const request = contexto.getRequest<Request>();

    let status = HttpStatus.BAD_REQUEST;

    if (
      exception instanceof HorarioNoEncontradoError ||
      exception instanceof MiembroNoEncontradoError
    ) {
      status = HttpStatus.NOT_FOUND;
    }

    if (
      exception instanceof CupoLlenoError ||
      exception instanceof InscripcionDuplicadaError
    ) {
      status = HttpStatus.CONFLICT;
    }

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}