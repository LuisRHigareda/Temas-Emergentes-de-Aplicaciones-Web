import { Inject, Injectable } from '@nestjs/common';

import type { Horario } from './dominio/entidades.js';
import type { HorarioRepository } from './dominio/horario.repository.js';

import type { CrearHorarioDto } from './dto/crear-horario.dto.js';
import type { ActualizarHorarioDto } from './dto/actualizar-horario.dto.js';

import { HORARIO_REPOSITORY } from './horarios.tokens.js';

@Injectable()
export class HorariosService {
    constructor(
        @Inject(HORARIO_REPOSITORY)
        private readonly repositorio: HorarioRepository,
    ) { }

    listar(): Promise<Horario[]> {
        return this.repositorio.listar();
    }

    buscar(id: number): Promise<Horario | null> {
        return this.repositorio.buscarPorId(id);
    }

    crear(dto: CrearHorarioDto): Promise<Horario> {
        return this.repositorio.crear(dto);
    }

    actualizar(
        id: number,
        dto: ActualizarHorarioDto,
    ): Promise<Horario | null> {
        return this.repositorio.actualizar(id, dto);
    }

    eliminar(id: number): Promise<boolean> {
        return this.repositorio.eliminar(id);
    }
}