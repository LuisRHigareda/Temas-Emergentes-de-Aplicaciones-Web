import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';

import {
  AppController,
} from './app.controller.js';

import {
  AppService,
} from './app.service.js';

import {
  ClasesModule,
} from './clases/clases.module.js';

import {
  InscripcionesModule,
} from './inscripciones/inscripciones.module.js';

import {
  MiembrosModule,
} from './miembros/miembros.module.js';

import {
  HorariosModule,
} from './horarios/horarios.module.js';

import {
  AuthModule,
} from './auth/auth.module.js';

import {
  PrismaModule,
} from '../prisma/prisma.module.js';

import {
  PeticionIdMiddleware,
} from './comun/middleware/peticion-id.middleware.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ClasesModule,
    InscripcionesModule,
    MiembrosModule,
    HorariosModule,
  ],

  controllers: [
    AppController,
  ],

  providers: [
    AppService,
  ],
})
export class AppModule
  implements NestModule {
  configure(
    consumer:
      MiddlewareConsumer,
  ) {
    consumer
      .apply(
        PeticionIdMiddleware,
      )
      .forRoutes('*');
  }
}