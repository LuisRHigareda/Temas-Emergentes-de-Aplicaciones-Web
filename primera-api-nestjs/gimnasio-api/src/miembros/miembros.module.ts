import { Module } from '@nestjs/common';

import { MiembrosController } from './miembros.controller.js';
import { MiembrosService } from './miembros.service.js';

import { MiembroMemoriaRepository } from './infra/miembro-memoria.repository.js';

import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';

@Module({
  controllers: [
    MiembrosController,
  ],

  providers: [
    MiembrosService,

    {
      provide: MIEMBRO_REPOSITORY,
      useClass: MiembroMemoriaRepository,
    },
  ],
})
export class MiembrosModule {}