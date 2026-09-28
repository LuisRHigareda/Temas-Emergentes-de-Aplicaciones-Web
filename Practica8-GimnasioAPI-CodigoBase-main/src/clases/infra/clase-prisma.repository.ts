import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../prisma/prisma.service.js';

import type { Clase } from '../dominio/entidades.js';
import type { ClaseRepository } from '../dominio/clase.repository.js';
import type { CrearClaseDto } from '../dto/crear-clase.dto.js';
import type { ActualizarClaseDto } from '../dto/actualizar-clase.dto.js';

@Injectable()
export class ClasePrismaRepository implements ClaseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listar(): Promise<Clase[]> {
    return this.prisma.clase.findMany();
  }

  async buscarPorId(id: number): Promise<Clase | null> {
    return this.prisma.clase.findUnique({
      where: { id },
    });
  }

  async crear(datos: CrearClaseDto): Promise<Clase> {
    return this.prisma.clase.create({
      data: datos,
    });
  }

  async actualizar(
    id: number,
    datos: ActualizarClaseDto,
  ): Promise<Clase | null> {
    const existe = await this.prisma.clase.findUnique({
      where: { id },
    });

    if (!existe) {
      return null;
    }

    return this.prisma.clase.update({
      where: { id },
      data: datos,
    });
  }

  async eliminar(id: number): Promise<Clase | null> {
    const existe = await this.prisma.clase.findUnique({
      where: { id },
    });

    if (!existe) {
      return null;
    }

    return this.prisma.clase.delete({
      where: { id },
    });
  }
}