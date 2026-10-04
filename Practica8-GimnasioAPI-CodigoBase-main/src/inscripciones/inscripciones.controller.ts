import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';

import type {
  Response,
} from 'express';

import {
  InscripcionesService,
} from './inscripciones.service.js';

import {
  CrearInscripcionDto,
} from './dto/crear-inscripcion.dto.js';

import {
  aInscripcionDto,
} from './dto/inscripcion-respuesta.dto.js';

import {
  UsuarioActual,
} from '../auth/decoradores/usuario-actual.decorator.js';

import {
  Roles,
} from '../auth/decoradores/roles.decorator.js';

import {
  Rol,
  type PayloadJwt,
} from '../auth/dominio/usuario.js';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(
    private readonly servicio:
      InscripcionesService,
  ) { }

  @Get()
  async listar() {
    const lista =
      await this.servicio.listar();

    return lista.map(
      aInscripcionDto,
    );
  }

  @Get(':id')
  async buscar(
    @Param('id') id: string,
  ) {
    const inscripcion =
      await this.servicio.buscar(
        Number(id),
      );

    if (!inscripcion) {
      throw new NotFoundException(
        `No existe la inscripcion ${id}`,
      );
    }

    return aInscripcionDto(
      inscripcion,
    );
  }

  @Post()
  @HttpCode(201)
  async crear(
    @Body()
    dto: CrearInscripcionDto,

    @UsuarioActual()
    usuario: PayloadJwt,

    @Res({ passthrough: true })
    res: Response,
  ) {
    if (
      usuario.rol === Rol.miembro &&
      usuario.miembroId !== dto.miembroId
    ) {
      throw new ForbiddenException(
        'Solo puedes inscribirte a ti mismo',
      );
    }

    const inscripcion =
      await this.servicio.crear(dto);

    res.setHeader(
      'Location',
      `/inscripciones/${inscripcion.id}`,
    );

    return aInscripcionDto(
      inscripcion,
    );
  }

  @Roles(
    Rol.entrenador,
    Rol.admin,
  )
  @Delete(':id')
  async cancelar(
    @Param('id') id: string,
  ) {
    const cancelada =
      await this.servicio.cancelar(
        Number(id),
      );

    if (!cancelada) {
      throw new NotFoundException(
        `No existe la inscripcion ${id}`,
      );
    }

    return aInscripcionDto(
      cancelada,
    );
  }
}