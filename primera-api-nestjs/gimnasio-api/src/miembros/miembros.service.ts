import { Inject, Injectable } from '@nestjs/common';

import type { Miembro } from './dominio/entidades.js';
import type { MiembroRepository } from './dominio/miembro.repository.js';

import type { CrearMiembroDto } from './dto/crear-miembro.dto.js';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto.js';

import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';

@Injectable()
export class MiembrosService {
  constructor(
    @Inject(MIEMBRO_REPOSITORY)
    private readonly repositorio: MiembroRepository,
  ) {}

  listar(): Promise<Miembro[]> {
    return this.repositorio.listar();
  }

  buscar(id: number): Promise<Miembro | null> {
    return this.repositorio.buscarPorId(id);
  }

  crear(dto: CrearMiembroDto): Promise<Miembro> {
    return this.repositorio.crear(dto);
  }

  actualizar(
    id: number,
    dto: ActualizarMiembroDto,
  ): Promise<Miembro | null> {
    return this.repositorio.actualizar(id, dto);
  }

  eliminar(id: number): Promise<boolean> {
    return this.repositorio.eliminar(id);
  }
}