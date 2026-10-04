import {
    ConflictException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import {
    JwtService,
} from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import {
    type PayloadJwt,
    Rol,
    type Usuario,
} from './dominio/usuario.js';

import {
    USUARIO_REPOSITORY,
    type UsuarioRepository,
} from './dominio/usuario.repository.js';

import {
    LoginDto,
    RegistroDto,
    TokenDto,
} from './dto/auth.dto.js';

const VUELTAS = 10;

@Injectable()
export class AuthService {
    constructor(
        @Inject(USUARIO_REPOSITORY)
        private readonly repo:
            UsuarioRepository,

        private readonly jwt:
            JwtService,
    ) { }

    async registrar(
        dto: RegistroDto,
    ): Promise<TokenDto> {
        const existente =
            await this.repo.buscarPorCorreo(
                dto.correo,
            );

        if (existente) {
            throw new ConflictException(
                'Ese correo ya esta registrado',
            );
        }

        const usuario =
            await this.repo.guardar({
                correo: dto.correo,
                passwordHash:
                    await bcrypt.hash(
                        dto.password,
                        VUELTAS,
                    ),
                rol:
                    dto.rol ??
                    Rol.miembro,
                miembroId:
                    dto.miembroId ??
                    null,
            });

        return this.firmar(usuario);
    }

    async login(
        dto: LoginDto,
    ): Promise<TokenDto> {
        const usuario =
            await this.repo.buscarPorCorreo(
                dto.correo,
            );

        const generico =
            new UnauthorizedException(
                'Credenciales invalidas',
            );

        if (!usuario) {
            throw generico;
        }

        const coincide =
            await bcrypt.compare(
                dto.password,
                usuario.passwordHash,
            );

        if (!coincide) {
            throw generico;
        }

        return this.firmar(usuario);
    }

    private async firmar(
        usuario: Usuario,
    ): Promise<TokenDto> {
        const payload: PayloadJwt = {
            sub: usuario.id,
            correo: usuario.correo,
            rol: usuario.rol,
            miembroId:
                usuario.miembroId,
        };

        return {
            access_token:
                await this.jwt.signAsync(
                    payload,
                ),
            token_type: 'Bearer',
            expires_in: 3600,
        };
    }
}