import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Publico } from '../auth/decoradores/publico.decorator.js';
import { ActualizarHorarioDto } from './dto/actualizar-horario.dto.js';
import { CrearHorarioDto } from './dto/crear-horario.dto.js';
import { HorariosService } from './horarios.service.js';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) { }

  @Publico()
  @Get()
  listar() {
    return this.horariosService.listar();
  }

  @Publico()
  @Get(':id')
  async buscar(@Param('id') id: string) {
    const horario = await this.horariosService.buscar(Number(id));

    if (!horario) {
      throw new NotFoundException(`No existe el horario ${id}`);
    }

    return horario;
  }

  @Post()
  @HttpCode(201)
  crear(@Body() dto: CrearHorarioDto) {
    return this.horariosService.crear(dto);
  }

  @Patch(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() dto: ActualizarHorarioDto,
  ) {
    const horario = await this.horariosService.actualizar(Number(id), dto);

    if (!horario) {
      throw new NotFoundException(`No existe el horario ${id}`);
    }

    return horario;
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const horario = await this.horariosService.eliminar(Number(id));

    if (!horario) {
      throw new NotFoundException(`No existe el horario ${id}`);
    }

    return horario;
  }
}