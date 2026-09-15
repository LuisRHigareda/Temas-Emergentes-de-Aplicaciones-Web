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

import type { Miembro } from './dominio/entidades.js';
import type { CrearMiembroDto } from './dto/crear-miembro.dto.js';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto.js';

import { MiembrosService } from './miembros.service.js';

@Controller('miembros')
export class MiembrosController {
    constructor(
        private readonly miembrosService: MiembrosService,
    ) { }

    @Get()
    listar(): Promise<Miembro[]> {
        return this.miembrosService.listar();
    }

    @Get(':id')
    buscar(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Miembro | null> {
        return this.miembrosService.buscar(id);
    }

    @Post()
    crear(
        @Body() dto: CrearMiembroDto,
    ): Promise<Miembro> {
        return this.miembrosService.crear(dto);
    }

    @Patch(':id')
    actualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActualizarMiembroDto,
    ): Promise<Miembro | null> {
        return this.miembrosService.actualizar(id, dto);
    }

    @Delete(':id')
    eliminar(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<boolean> {
        return this.miembrosService.eliminar(id);
    }
}