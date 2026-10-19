import {
  isAxiosError,
} from 'axios';

import {
  api,
} from '../api/cliente';

interface CrearPedido {
  correo: string;
  telefono: string;
  productos: string[];
}

interface PedidoCreado {
  folio: string;
  total: number;
}

interface Sobre<T> {
  data: T;
  meta: {
    ruta: string;
    duracionMs: number;
    timestamp: string;
  };
}

interface ErrorApi {
  message?: string | string[];
}

export async function crearPedido(
  pedido: CrearPedido,
): Promise<PedidoCreado> {
  try {
    const respuesta =
      await api.post<Sobre<PedidoCreado>>(
        '/pedidos',
        pedido,
      );

    return respuesta.data.data;
  }
  catch (error) {
    if (isAxiosError<ErrorApi>(error)) {
      const mensaje =
        error.response?.data?.message;

      if (Array.isArray(mensaje)) {
        throw new Error(
          mensaje.join(', '),
        );
      }

      if (mensaje) {
        throw new Error(mensaje);
      }

      if (!error.response) {
        throw new Error(
          'No se pudo conectar con la API.',
        );
      }
    }

    throw new Error(
      'No se pudo completar el pedido.',
    );
  }
}
