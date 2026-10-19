import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import type {
  Producto,
} from '../datos';

import {
  obtenerProductos,
} from '../servicios/productos.service';

export function useProductos() {
  const [
    productos,
    setProductos,
  ] = useState<Producto[]>([]);

  const [
    cargando,
    setCargando,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  const cargar = useCallback(
    async () => {
      setCargando(true);
      setError(null);

      try {
        const datos =
          await obtenerProductos();

        setProductos(datos);
      }
      catch {
        setError(
          'No se pudieron cargar los productos.',
        );
      }
      finally {
        setCargando(false);
      }
    },
    [],
  );

  useEffect(
    () => {
      void cargar();
    },
    [cargar],
  );

  return {
    productos,
    cargando,
    error,
    reintentar: cargar,
    recargar: cargar,
  };
}
