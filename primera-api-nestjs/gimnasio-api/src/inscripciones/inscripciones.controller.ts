import {
    BadRequestException,
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Res,
} from '@nestjs/common';

import type { Response } from 'express';

import type { CrearInscripcionDto } from '../CodigoBase/inscripciones/dto/crear-inscripcion.dto.js';

import {
    aInscripcionDto,
    type InscripcionResponseDto,
} from '../CodigoBase/inscripciones/dto/inscripcion-respuesta.dto.js';

import {
    CupoLlenoError,
    HorarioNoEncontradoError,
    InscripcionDuplicadaError,
    MiembroNoEncontradoError,
} from '../CodigoBase/inscripciones/dominio/errores.js';

import { InscripcionesService } from './inscripciones.service.js';

@Controller('inscripciones')
export class InscripcionesController {
    constructor(
        private readonly inscripcionesService: InscripcionesService,
    ) { }

    // GET /inscripciones
    @Get()
    async listar(): Promise<InscripcionResponseDto[]> {
        const inscripciones = await this.inscripcionesService.listar();

        return inscripciones.map(aInscripcionDto);
    }

    // POST /inscripciones
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async crear(
        @Body() dto: CrearInscripcionDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<InscripcionResponseDto> {

        // Validar que vengan los campos obligatorios.
        if (
            typeof dto?.horarioId !== 'number' ||
            typeof dto?.miembroId !== 'number'
        ) {
            throw new BadRequestException(
                'Se requieren horarioId y miembroId',
            );
        }

        try {
            const inscripcion =
                await this.inscripcionesService.crear(dto);

            // Cabecera Location del recurso recien creado.
            res.location(`/inscripciones/${inscripcion.id}`);

            return aInscripcionDto(inscripcion);
        } catch (error) {

            // Horario o miembro inexistente -> 404
            if (
                error instanceof HorarioNoEncontradoError ||
                error instanceof MiembroNoEncontradoError
            ) {
                throw new NotFoundException(error.message);
            }

            // Reglas del gimnasio -> 409
            if (
                error instanceof CupoLlenoError ||
                error instanceof InscripcionDuplicadaError
            ) {
                throw new ConflictException(error.message);
            }

            // Cualquier otro error se vuelve a lanzar.
            throw error;
        }
    }

    // DELETE /inscripciones/:id
    @Delete(':id')
    async cancelar(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<InscripcionResponseDto> {

        const inscripcion =
            await this.inscripcionesService.cancelar(id);

        if (inscripcion === null) {
            throw new NotFoundException(
                `No existe la inscripcion ${id}`,
            );
        }

        return aInscripcionDto(inscripcion);
    }
}