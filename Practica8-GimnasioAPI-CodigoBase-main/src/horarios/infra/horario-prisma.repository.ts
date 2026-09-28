import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service.js';

import type { Horario } from '../dominio/entidades.js';
import type { HorarioRepository } from '../dominio/horario.repository.js';
import type { CrearHorarioDto } from '../dto/crear-horario.dto.js';
import type { ActualizarHorarioDto } from '../dto/actualizar-horario.dto.js';

@Injectable()
export class HorarioPrismaRepository implements HorarioRepository {
    constructor(private readonly prisma: PrismaService) { }

    async listar(): Promise<Horario[]> {
        return this.prisma.horario.findMany();
    }

    async buscarPorId(id: number): Promise<Horario | null> {
        return this.prisma.horario.findUnique({
            where: { id },
        });
    }

    async crear(datos: CrearHorarioDto): Promise<Horario> {
        return this.prisma.horario.create({
            data: datos,
        });
    }

    async actualizar(
        id: number,
        datos: ActualizarHorarioDto,
    ): Promise<Horario | null> {
        const existe = await this.prisma.horario.findUnique({
            where: { id },
        });

        if (!existe) {
            return null;
        }

        return this.prisma.horario.update({
            where: { id },
            data: datos,
        });
    }

    async eliminar(id: number): Promise<Horario | null> {
        const existe = await this.prisma.horario.findUnique({
            where: { id },
        });

        if (!existe) {
            return null;
        }

        return this.prisma.horario.delete({
            where: { id },
        });
    }
}