import type { Horario } from './entidades.js';

export interface HorarioRepository {
    listar(): Promise<Horario[]>;

    buscarPorId(id: number): Promise<Horario | null>;

    crear(
        datos: Omit<Horario, 'id'>,
    ): Promise<Horario>;

    actualizar(
        id: number,
        cambios: Partial<Omit<Horario, 'id'>>,
    ): Promise<Horario | null>;

    eliminar(id: number): Promise<boolean>;
}