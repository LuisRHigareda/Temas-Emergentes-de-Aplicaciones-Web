import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import { ErrorDominioFilter } from './comun/filtros/error-dominio.filter.js';
import { peticionIdMiddleware } from './comun/middleware/peticion-id.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(peticionIdMiddleware);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new ErrorDominioFilter());

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    methods: [
      'GET',
      'POST',
      'PATCH',
      'DELETE',
    ],
    exposedHeaders: [
      'Location',
      'X-Request-Id',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();