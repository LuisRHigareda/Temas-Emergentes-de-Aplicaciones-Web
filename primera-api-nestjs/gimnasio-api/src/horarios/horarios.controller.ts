import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';

import type { Horario } from './dominio/entidades.js';
import type { CrearHorarioDto } from './dto/crear-horario.dto.js';
import type { ActualizarHorarioDto } from './dto/actualizar-horario.dto.js';

import { HorariosService } from './horarios.service.js';

@Controller('horarios')
export class HorariosController {
    constructor(
        private readonly horariosService: HorariosService,
    ) { }

    @Get()
    listar(): Promise<Horario[]> {
        return this.horariosService.listar();
    }

    @Get(':id')
    buscar(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Horario | null> {
        return this.horariosService.buscar(id);
    }

    @Post()
    crear(
        @Body() dto: CrearHorarioDto,
    ): Promise<Horario> {
        return this.horariosService.crear(dto);
    }

    @Patch(':id')
    actualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarHorarioDto,
    ): Promise<Horario | null> {
        return this.horariosService.actualizar(id, dto);
    }

    @Delete(':id')
    eliminar(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<boolean> {
        return this.horariosService.eliminar(id);
    }
}