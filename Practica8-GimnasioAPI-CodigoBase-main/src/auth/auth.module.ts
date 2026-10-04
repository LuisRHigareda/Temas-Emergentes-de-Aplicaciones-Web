import {
    Module,
} from '@nestjs/common';

import {
    JwtModule,
} from '@nestjs/jwt';

import {
    PassportModule,
} from '@nestjs/passport';

import {
    AuthController,
} from './auth.controller.js';

import {
    AuthService,
} from './auth.service.js';

import {
    JwtStrategy,
} from './jwt.strategy.js';

import {
    USUARIO_REPOSITORY,
} from './dominio/usuario.repository.js';

import {
    UsuarioPrismaRepository,
} from './infra/usuario-prisma.repository.js';

@Module({
    imports: [
        PassportModule,

        JwtModule.register({
            secret:
                process.env.JWT_SECRET,

            signOptions: {
                expiresIn: '1h',
            },
        }),
    ],

    controllers: [
        AuthController,
    ],

    providers: [
        AuthService,
        JwtStrategy,

        {
            provide:
                USUARIO_REPOSITORY,

            useClass:
                UsuarioPrismaRepository,
        },
    ],
})
export class AuthModule { }