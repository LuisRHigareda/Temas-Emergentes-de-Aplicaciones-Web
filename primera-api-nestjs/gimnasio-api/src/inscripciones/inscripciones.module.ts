import { Module } from '@nestjs/common';

import { InscripcionesController } from './inscripciones.controller.js';
import { InscripcionesService } from './inscripciones.service.js';

import { InscripcionMemoriaRepository } from '../CodigoBase/inscripciones/infra/inscripcion-memoria.repository.js';

import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens.js';

@Module({
  controllers: [InscripcionesController],

  providers: [
    InscripcionesService,

    {
      provide: INSCRIPCION_REPOSITORY,
      useClass: InscripcionMemoriaRepository,
    },
  ],
})
export class InscripcionesModule {}