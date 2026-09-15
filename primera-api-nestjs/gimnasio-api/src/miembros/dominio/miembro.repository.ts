import type { Miembro } from './entidades.js';

export interface MiembroRepository {
  listar(): Promise<Miembro[]>;

  buscarPorId(id: number): Promise<Miembro | null>;

  crear(
    datos: Omit<Miembro, 'id' | 'activo'>,
  ): Promise<Miembro>;

  actualizar(
    id: number,
    cambios: Partial<Omit<Miembro, 'id'>>,
  ): Promise<Miembro | null>;

  eliminar(id: number): Promise<boolean>;
}