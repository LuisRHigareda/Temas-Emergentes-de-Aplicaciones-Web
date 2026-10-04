import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
} from '@nestjs/common';

import {
    AuthService,
} from './auth.service.js';

import {
    LoginDto,
    RegistroDto,
    TokenDto,
} from './dto/auth.dto.js';

import {
    Publico,
} from './decoradores/publico.decorator.js';

import {
    UsuarioActual,
} from './decoradores/usuario-actual.decorator.js';

import type {
    PayloadJwt,
} from './dominio/usuario.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly auth:
            AuthService,
    ) { }

    @Publico()
    @Post('registro')
    @HttpCode(201)
    registro(
        @Body() dto: RegistroDto,
    ): Promise<TokenDto> {
        return this.auth.registrar(dto);
    }

    @Publico()
    @Post('login')
    @HttpCode(200)
    login(
        @Body() dto: LoginDto,
    ): Promise<TokenDto> {
        return this.auth.login(dto);
    }

    @Get('yo')
    yo(
        @UsuarioActual()
        usuario: PayloadJwt,
    ) {
        return usuario;
    }
}