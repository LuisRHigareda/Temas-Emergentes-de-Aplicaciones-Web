import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import type {
  PayloadJwt,
} from '../dominio/usuario.js';

export const UsuarioActual =
  createParamDecorator(
    (
      _dato: unknown,
      contexto: ExecutionContext,
    ): PayloadJwt => {
      const req = contexto
        .switchToHttp()
        .getRequest<{
          user: PayloadJwt;
        }>();

      return req.user;
    },
  );