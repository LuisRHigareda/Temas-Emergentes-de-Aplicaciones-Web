import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service.js';

import type { Miembro } from '../dominio/entidades.js';
import type { MiembroRepository } from '../dominio/miembro.repository.js';
import type { CrearMiembroDto } from '../dto/crear-miembro.dto.js';
import type { ActualizarMiembroDto } from '../dto/actualizar-miembro.dto.js';

@Injectable()
export class MiembroPrismaRepository implements MiembroRepository {
    constructor(private readonly prisma: PrismaService) { }

    async listar(): Promise<Miembro[]> {
        return this.prisma.miembro.findMany();
    }

    async buscarPorId(id: number): Promise<Miembro | null> {
        return this.prisma.miembro.findUnique({
            where: { id },
        });
    }

    async crear(datos: CrearMiembroDto): Promise<Miembro> {
        return this.prisma.miembro.create({
            data: datos,
        });
    }

    async actualizar(
        id: number,
        datos: ActualizarMiembroDto,
    ): Promise<Miembro | null> {
        const existe = await this.prisma.miembro.findUnique({
            where: { id },
        });

        if (!existe) {
            return null;
        }

        return this.prisma.miembro.update({
            where: { id },
            data: datos,
        });
    }

    async eliminar(id: number): Promise<Miembro | null> {
        const existe = await this.prisma.miembro.findUnique({
            where: { id },
        });

        if (!existe) {
            return null;
        }

        return this.prisma.miembro.delete({
            where: { id },
        });
    }
}