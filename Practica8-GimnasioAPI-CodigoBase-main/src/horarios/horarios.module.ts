import { Module } from '@nestjs/common';

import { HorariosController } from './horarios.controller.js';
import { HorariosService } from './horarios.service.js';
import { HORARIO_REPOSITORY } from './horarios.tokens.js';
import { HorarioPrismaRepository } from './infra/horario-prisma.repository.js';

@Module({
  controllers: [HorariosController],
  providers: [
    HorariosService,
    {
      provide: HORARIO_REPOSITORY,
      useClass: HorarioPrismaRepository,
    },
  ],
  exports: [HorariosService],
})
export class HorariosModule {}