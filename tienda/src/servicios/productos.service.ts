import { api } from '../api/cliente';

import type {
  Producto,
} from '../datos';

interface Sobre<T> {
  data: T;
  meta: {
    ruta: string;
    duracionMs: number;
    timestamp: string;
  };
}

export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta =
    await api.get<Sobre<Producto[]>>(
      '/productos',
    );

  return respuesta.data.data;
}
