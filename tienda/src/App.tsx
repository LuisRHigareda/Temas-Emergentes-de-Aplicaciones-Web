import {
  useState,
} from 'react';

import type {
  Producto,
} from './datos';

import {
  Layout,
} from './componentes/Layout';

import {
  Encabezado,
} from './componentes/Encabezado';

import {
  PiePagina,
} from './componentes/PiePagina';

import {
  Filtros,
} from './componentes/Filtros';

import type {
  Categoria,
} from './componentes/Filtros';

import {
  Catalogo,
} from './componentes/Catalogo';

import {
  Cargando,
} from './componentes/Cargando';

import {
  MensajeError,
} from './componentes/MensajeError';

import {
  FormularioPago,
} from './componentes/FormularioPago';

import {
  useProductos,
} from './hooks/useProductos';


function App() {
  const [
    filtro,
    setFiltro,
  ] = useState<Categoria>('todas');

  const [
    carrito,
    setCarrito,
  ] = useState<Producto[]>([]);

  const {
    productos,
    cargando,
    error,
    reintentar,
    recargar,
  } = useProductos();

  function agregarAlCarrito(
    producto: Producto,
  ) {
    setCarrito(
      (anterior) => [
        ...anterior,
        producto,
      ],
    );
  }

  async function pedidoConfirmado() {
    setCarrito([]);
    await recargar();
  }

  const productosFiltrados =
    filtro === 'todas'
      ? productos
      : productos.filter(
        (producto) =>
          producto.categoria === filtro,
      );

  const piezas = carrito.length;

  const total =
    carrito.reduce(
      (suma, producto) =>
        suma + producto.precio,
      0,
    );

  return (
    <Layout
      encabezado={
        <Encabezado piezas={piezas} />
      }
      pie={
        <PiePagina
          piezas={piezas}
          total={total}
        />
      }>

      <section className="portada">
        <h1>Catálogo de temporada</h1>

        <p>
          {productosFiltrados.length}
          {' '}
          producto(s)
        </p>
      </section>

      {
        cargando
          ? <Cargando />
          : error
            ? (
              <MensajeError
                mensaje={error}
                onReintentar={reintentar}
              />
            )
            : (
              <>
                <Filtros
                  activa={filtro}
                  onCambiar={setFiltro}
                />

                <Catalogo
                  productos={productosFiltrados}
                  onAgregar={agregarAlCarrito}
                />

                <FormularioPago
                  carrito={carrito}
                  onConfirmado={pedidoConfirmado}
                />
              </>
            )
      }

    </Layout>
  );
}

export default App;
