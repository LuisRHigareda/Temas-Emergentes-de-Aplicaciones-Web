import {
    SetMetadata,
} from '@nestjs/common';

import {
    Rol,
} from '../dominio/usuario.js';

export const ROLES = 'roles';

export const Roles = (
    ...roles: Rol[]
) => SetMetadata(ROLES, roles);