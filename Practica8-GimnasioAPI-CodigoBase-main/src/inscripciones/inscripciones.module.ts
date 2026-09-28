import { Module } from '@nestjs/common';

import { InscripcionesController } from './inscripciones.controller.js';
import { InscripcionesService } from './inscripciones.service.js';
import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens.js';
import { InscripcionPrismaRepository } from './infra/inscripcion-prisma.repository.js';

@Module({
  controllers: [InscripcionesController],
  providers: [
    InscripcionesService,
    {
      provide: INSCRIPCION_REPOSITORY,
      useClass: InscripcionPrismaRepository,
    },
  ],
})
export class InscripcionesModule {}