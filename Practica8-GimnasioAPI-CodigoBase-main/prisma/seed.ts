import 'dotenv/config';

import * as bcrypt from 'bcryptjs';

import {
    PrismaService,
} from './prisma.service.js';

const prisma =
    new PrismaService();

async function main() {
    await prisma.usuario.deleteMany();

    const passwordHash =
        await bcrypt.hash(
            'gimnasio2026',
            10,
        );

    await prisma.usuario.createMany({
        data: [
            {
                correo:
                    'karla@itson.mx',
                passwordHash,
                rol: 'miembro',
                miembroId: 1,
            },

            {
                correo:
                    'ana@itson.mx',
                passwordHash,
                rol: 'entrenador',
                miembroId: null,
            },

            {
                correo:
                    'admin@itson.mx',
                passwordHash,
                rol: 'admin',
                miembroId: null,
            },
        ],
    });

    console.log(
        'Usuarios de prueba creados',
    );
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });