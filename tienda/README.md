# Práctica 14 - La tienda contra su API

En esta práctica conecté la tienda de React con el backend. El catálogo ya no toma los productos del arreglo local, ahora los pide a la API. También agregué el pago simulado para mandar el carrito y recibir el folio del pedido.

## Productos desde la API

Se usa una sola instancia de Axios en `src/api/cliente.ts`. Ahí está la dirección del backend y el tiempo límite de la petición.

La consulta de productos está en `src/servicios/productos.service.ts`. El servicio recibe la respuesta del backend y devuelve solamente `data`, porque la API manda las respuestas dentro del sobre `{ data, meta }`.

El hook `useProductos` hace la petición desde un efecto y maneja tres estados: cargando, error y productos. Si la API falla aparece el botón para volver a intentar.

### ¿Por qué en la pestaña Red salen dos peticiones al cargar?

Porque la aplicación está usando `StrictMode` en desarrollo. React vuelve a ejecutar el efecto una vez extra para ayudar a detectar problemas. Por eso se ven dos peticiones al iniciar, pero es comportamiento del modo de desarrollo.

### ¿Qué pasa si quitas el arreglo de dependencias del efecto?

El efecto se ejecuta después de cada render. Como la petición cambia el estado, ocurre otro render y se vuelve a ejecutar el efecto. El resultado es que empiezan a salir peticiones continuamente en la pestaña Red.

## Pago simulado

El formulario guarda el correo y el teléfono en el estado. Antes de mandar el pedido se revisa que el correo tenga `@` y que el teléfono tenga exactamente 10 dígitos.

Al pagar se mandan a `/pedidos` los ids de los productos que están en el carrito. Si todo sale bien se muestra el folio, se vacía el carrito y se vuelven a pedir los productos para mostrar la existencia actualizada.

Si el backend rechaza el pedido, por ejemplo porque ya no hay suficientes piezas, el mensaje aparece dentro del formulario.

### ¿Qué hace e.preventDefault() y qué pasa si lo quitas?

Evita que el formulario haga su envío normal y recargue la página. Si se quita, al presionar Pagar el navegador intenta enviar el formulario y la página se recarga, por lo que React pierde el control de ese envío.

## Componentes anteriores

Los componentes de la práctica anterior se conservaron. Para comprobarlo se puede ejecutar:

```bash
git diff
```

Los archivos nuevos de esta práctica son el cliente de Axios, los servicios, el hook, `Cargando`, `MensajeError` y `FormularioPago`. `App.tsx` solamente los conecta con la tienda.

## Ejecutar

Primero se levanta el backend y después el frontend.

Backend:

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

Frontend:

```bash
npm install
npm run dev
```

El backend corre en `http://localhost:3000` y Vite en `http://localhost:5173`.

## Evidencias

En la carpeta `evidencias` estan las capturas de:

- la pestaña Red con las peticiones de productos
- el pedido confirmado mostrando el folio
- el mensaje 409 por existencia insuficiente
- el error con la API apagada
- el reintento funcionando después de volver a encender la API
