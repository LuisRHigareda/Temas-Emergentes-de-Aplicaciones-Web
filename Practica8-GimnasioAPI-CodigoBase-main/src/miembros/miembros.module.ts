import { Module } from '@nestjs/common';

import { MiembrosController } from './miembros.controller.js';
import { MiembrosService } from './miembros.service.js';
import { MIEMBRO_REPOSITORY } from './miembros.tokens.js';
import { MiembroPrismaRepository } from './infra/miembro-prisma.repository.js';

@Module({
  controllers: [MiembrosController],
  providers: [
    MiembrosService,
    {
      provide: MIEMBRO_REPOSITORY,
      useClass: MiembroPrismaRepository,
    },
  ],
  exports: [MiembrosService],
})
export class MiembrosModule { }