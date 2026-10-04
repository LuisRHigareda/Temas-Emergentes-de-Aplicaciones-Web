import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';

import {
    Reflector,
} from '@nestjs/core';

import {
    ROLES,
} from '../decoradores/roles.decorator.js';

import {
    Rol,
    type PayloadJwt,
} from '../dominio/usuario.js';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) { }

    canActivate(
        contexto: ExecutionContext,
    ): boolean {
        const permitidos =
            this.reflector.getAllAndOverride<Rol[]>(
                ROLES,
                [
                    contexto.getHandler(),
                    contexto.getClass(),
                ],
            );

        if (!permitidos) {
            return true;
        }

        const req = contexto
            .switchToHttp()
            .getRequest<{
                user?: PayloadJwt;
            }>();

        const usuario = req.user;

        if (
            !usuario ||
            !permitidos.includes(usuario.rol)
        ) {
            throw new ForbiddenException(
                'No tienes permiso para esta accion',
            );
        }

        return true;
    }
}