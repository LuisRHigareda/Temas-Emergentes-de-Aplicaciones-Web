# Práctica 13 - La tienda
En esta práctica hice una tienda con React y TypeScript. Los productos se cargan desde un arreglo y se muestran con tarjetas.
También agregué filtros por categoría y un carrito que muestra cuántos productos se han agregado y el total.

## Layout
Se hizo un componente `Layout` para acomodar el encabezado, el contenido y el pie de página.

### ¿Por qué el Layout no necesita saber que es una tienda?
Porque el Layout solamente acomoda lo que recibe. No necesita saber qué tipo de página es ni qué contenido se está mostrando.

## Catálogo
Cada producto se muestra con `TarjetaProducto`.
Si un producto no tiene existencia aparece como `Agotado` y el botón queda deshabilitado.
El catálogo usa `.map()` para crear las tarjetas.

### ¿Qué pasa si se escribe onClick={onAgregar(producto)} sin la flecha?
La función se ejecuta de inmediato al renderizar el componente.
Por eso se usa:
```tsx
onClick={() => onAgregar(producto)}
```
Así la función se ejecuta hasta que se hace clic en el botón.

## Filtros y carrito
El filtro activo y el carrito se guardan con `useState`.
Los productos filtrados y el total se calculan a partir de esos datos.

### ¿Por qué carrito.push(...) no actualiza el contador?
Porque `push` modifica directamente el mismo arreglo.
React no detecta un cambio de estado solamente por modificar ese arreglo, por eso el contador no se actualiza.
En cambio, usando `setCarrito` se crea un arreglo nuevo y React vuelve a renderizar la página.

## Evidencias
Las capturas se encuentran en la carpeta `evidencias`:

