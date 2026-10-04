import {
    Injectable,
} from '@nestjs/common';

import {
    PrismaService,
} from '../../../prisma/prisma.service.js';

import {
    Rol,
    type NuevoUsuario,
    type Usuario,
} from '../dominio/usuario.js';

import type {
    UsuarioRepository,
} from '../dominio/usuario.repository.js';

@Injectable()
export class UsuarioPrismaRepository
    implements UsuarioRepository {
    constructor(
        private readonly prisma:
            PrismaService,
    ) { }

    async buscarPorCorreo(
        correo: string,
    ): Promise<Usuario | null> {
        const fila =
            await this.prisma.usuario.findUnique({
                where: {
                    correo:
                        correo.toLowerCase(),
                },
            });

        return fila
            ? {
                ...fila,
                rol: fila.rol as Rol,
            }
            : null;
    }

    async guardar(
        nuevo: NuevoUsuario,
    ): Promise<Usuario> {
        const fila =
            await this.prisma.usuario.create({
                data: {
                    ...nuevo,
                    correo:
                        nuevo.correo.toLowerCase(),
                },
            });

        return {
            ...fila,
            rol: fila.rol as Rol,
        };
    }
}
