import './tarjeta-producto';
import './alerta-app';

import {
  TablaGenerica,
} from './tabla-generica';

import type {
  Producto,
} from './tipos';


// Rejilla donde se van a colocar las tarjetas.
const rejilla =
  document.querySelector<HTMLElement>(
    '#rejilla',
  )!;


// Lista de productos del código base.
const productos: Producto[] = [
  {
    id: 'P-001',
    nombre: 'Tenis para correr Vento',
    precio: 1299,
    categoria: 'calzado',
    imagen: '/img/producto-01.jpg',
    existencia: 8,
  },
  {
    id: 'P-002',
    nombre: 'Tenis de entrenamiento Cross',
    precio: 1549,
    categoria: 'calzado',
    imagen: '/img/producto-02.jpg',
    existencia: 25,
  },
  {
    id: 'P-003',
    nombre: 'Tenis casuales Urbano',
    precio: 989,
    categoria: 'calzado',
    imagen: '/img/producto-03.jpg',
    existencia: 8,
  },
  {
    id: 'P-004',
    nombre: 'Sandalias de recuperación',
    precio: 449,
    categoria: 'calzado',
    imagen: '/img/producto-04.jpg',
    existencia: 25,
  },
  {
    id: 'P-005',
    nombre: 'Playera deportiva seca',
    precio: 399,
    categoria: 'ropa',
    imagen: '/img/producto-05.jpg',
    existencia: 3,
  },
  {
    id: 'P-006',
    nombre: 'Playera de algodón clásica',
    precio: 289,
    categoria: 'ropa',
    imagen: '/img/producto-06.jpg',
    existencia: 25,
  },
  {
    id: 'P-007',
    nombre: 'Sudadera con capucha',
    precio: 749,
    categoria: 'ropa',
    imagen: '/img/producto-07.jpg',
    existencia: 8,
  },
  {
    id: 'P-008',
    nombre: 'Short de entrenamiento',
    precio: 359,
    categoria: 'ropa',
    imagen: '/img/producto-08.jpg',
    existencia: 12,
  },
  {
    id: 'P-009',
    nombre: 'Licra de compresión',
    precio: 529,
    categoria: 'ropa',
    imagen: '/img/producto-09.jpg',
    existencia: 0,
  },
  {
    id: 'P-010',
    nombre: 'Pantalón deportivo',
    precio: 649,
    categoria: 'ropa',
    imagen: '/img/producto-10.jpg',
    existencia: 5,
  },
  {
    id: 'P-011',
    nombre: 'Chamarra rompeviento',
    precio: 899,
    categoria: 'ropa',
    imagen: '/img/producto-11.jpg',
    existencia: 0,
  },
  {
    id: 'P-012',
    nombre: 'Calcetas deportivas (3 pares)',
    precio: 179,
    categoria: 'ropa',
    imagen: '/img/producto-12.jpg',
    existencia: 25,
  },
];


// Creamos una tarjeta por cada producto.
for (const p of productos) {

  // Se crea igual que cualquier otra etiqueta del navegador.
  const tarjeta =
    document.createElement(
      'tarjeta-producto',
    );

  // Los datos se pasan por atributos.
  tarjeta.setAttribute(
    'producto-id',
    p.id,
  );

  tarjeta.setAttribute(
    'nombre',
    p.nombre,
  );

  // Los atributos siempre llegan como texto.
  tarjeta.setAttribute(
    'precio',
    String(p.precio),
  );

  tarjeta.setAttribute(
    'imagen',
    p.imagen,
  );

  tarjeta.setAttribute(
    'existencia',
    String(p.existencia),
  );

  // La tarjeta se agrega a la rejilla.
  rejilla.append(tarjeta);
}


// Elementos que usamos para el carrito.
const cuenta =
  document.querySelector<HTMLElement>(
    '#cuenta',
  )!;

const vaciar =
  document.querySelector<HTMLElement>(
    '#vaciar',
  )!;

const tablaCarrito =
  document.querySelector<TablaGenerica>(
    '#tabla-carrito',
  )!;


// Cantidad total de productos agregados.
let enCarrito = 0;


// Aquí guardamos lo que se va agregando al carrito.
const carrito: {
  id: string;
  producto: string;
  precio: string;
  cantidad: number;
}[] = [];


// Las columnas se pasan como propiedad porque son un arreglo.
tablaCarrito.columnas = [
  {
    clave: 'producto',
    titulo: 'Producto',
  },
  {
    clave: 'precio',
    titulo: 'Precio',
  },
  {
    clave: 'cantidad',
    titulo: 'Cantidad',
  },
];


// Al principio no tenemos productos en el carrito.
tablaCarrito.filas = [];


// Esta función vuelve a mandar las filas a la tabla.
function actualizarTabla() {
  tablaCarrito.filas =
    carrito.map(
      (fila) => ({
        producto: fila.producto,
        precio: fila.precio,
        cantidad: fila.cantidad,
      }),
    );
}


// Un solo listener recibe los eventos de las doce tarjetas.
rejilla.addEventListener(
  'agregar',
  (e) => {

    // Primero actualizamos el contador de arriba.
    enCarrito++;

    cuenta.textContent =
      String(enCarrito);


    // Revisamos si ese producto ya estaba en el carrito.
    const existente =
      carrito.find(
        (fila) =>
          fila.id === e.detail.id,
      );


    if (existente) {

      // Si ya estaba, solamente aumentamos su cantidad.
      existente.cantidad++;

    } else {

      // Si es la primera vez, agregamos una fila nueva.
      carrito.push({
        id: e.detail.id,
        producto: e.detail.nombre,
        precio:
          `$${e.detail.precio.toLocaleString('es-MX')}`,
        cantidad: 1,
      });
    }


    // Refrescamos la tabla con los datos nuevos.
    actualizarTabla();


    console.log(
      'Agregado:',
      e.detail.nombre,
      e.detail.precio,
    );
  },
);


// El botón Vaciar limpia el contador y también la tabla.
vaciar.addEventListener(
  'click',
  () => {

    enCarrito = 0;

    cuenta.textContent = '0';


    // Dejamos vacío el arreglo del carrito.
    carrito.length = 0;


    // Al no tener filas, la tabla mostrará "Sin datos".
    actualizarTabla();
  },
);


// Escuchamos el evento que manda una alerta al cerrarse.
document.addEventListener(
  'alerta-cerrada',
  (e) => {

    // Como este evento es personalizado,
    // indicamos qué información esperamos recibir.
    const evento =
      e as CustomEvent<{
        tipo: string;
      }>;


    console.log(
      'Alerta cerrada:',
      evento.detail.tipo,
    );
  },
);