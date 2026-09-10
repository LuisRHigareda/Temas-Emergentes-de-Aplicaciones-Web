import { Inject, Injectable } from '@nestjs/common';

import type { InscripcionRepository } from '../CodigoBase/inscripciones/dominio/inscripcion.repository.js';

import type { Inscripcion } from '../CodigoBase/inscripciones/dominio/entidades.js';

import type { CrearInscripcionDto } from '../CodigoBase/inscripciones/dto/crear-inscripcion.dto.js';

import {
  CupoLlenoError,
  HorarioNoEncontradoError,
  InscripcionDuplicadaError,
  MiembroNoEncontradoError,
} from '../CodigoBase/inscripciones/dominio/errores.js';

import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens.js';

@Injectable()
export class InscripcionesService {
  constructor(
    @Inject(INSCRIPCION_REPOSITORY)
    private readonly repositorio: InscripcionRepository,
  ) {}

  async listar(): Promise<Inscripcion[]> {
    return this.repositorio.listar();
  }

  async crear(dto: CrearInscripcionDto): Promise<Inscripcion> {
    // Verificar que el horario exista.
    const horario = await this.repositorio.buscarHorario(dto.horarioId);

    if (horario === null) {
      throw new HorarioNoEncontradoError(dto.horarioId);
    }

    // Verificar que el miembro exista.
    const miembro = await this.repositorio.buscarMiembro(dto.miembroId);

    if (miembro === null) {
      throw new MiembroNoEncontradoError(dto.miembroId);
    }

    // Consultar las inscripciones del horario.
    const inscripciones =
      await this.repositorio.buscarPorHorario(dto.horarioId);

    // Solo las inscripciones confirmadas ocupan un lugar.
    const confirmadas = inscripciones.filter(
      (inscripcion) => inscripcion.estado === 'confirmada',
    );

    // Regla 1:
    // Un miembro no puede estar inscrito dos veces
    // en el mismo horario.
    const duplicada = confirmadas.some(
      (inscripcion) => inscripcion.miembroId === dto.miembroId,
    );

    if (duplicada) {
      throw new InscripcionDuplicadaError(
        dto.horarioId,
        dto.miembroId,
      );
    }

    // Regla 2:
    // No se puede superar el cupo maximo del horario.
    if (confirmadas.length >= horario.cupoMaximo) {
      throw new CupoLlenoError(
        dto.horarioId,
        horario.cupoMaximo,
      );
    }

    // Si todo es valido, guardar la inscripcion.
    return this.repositorio.guardar(dto);
  }

  async cancelar(id: number): Promise<Inscripcion | null> {
    return this.repositorio.cancelar(id);
  }
}