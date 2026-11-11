# Práctica 21 - Rutas, formulario y API
En esta práctica se agregaron rutas al panel de administración del gimnasio, un formulario para capturar una nueva clase y la conexión del catálogo con el backend.

## Rutas
Se agregaron las páginas de clases, horarios y miembros. La ruta principal redirige a `/clases` y también se agregó una ruta para `/clases/nueva`.
Para navegar se usaron `routerLink` y `routerLinkActive`.

### ¿Qué parte de React Router corresponde a router-outlet, routerLink y routerLinkActive?
Se pueden comparar así:

```text
router-outlet     -> Outlet
routerLink        -> Link
routerLinkActive  -> NavLink
```

`router-outlet` es el lugar donde aparece la página correspondiente a la ruta actual.

### ¿Por qué la ruta ** va al final y la ruta vacía usa pathMatch: 'full'?
La ruta `**` funciona como comodín, así que se deja al final para que primero se revisen las rutas que sí existen.
En la ruta vacía se usa `pathMatch: 'full'` para que la redirección ocurra solamente cuando la dirección sea exactamente `/`.

## Formulario de nueva clase
Se creó un formulario reactivo para capturar:

- nombre
- categoría
- descripción
- duración
- imagen
Los errores aparecen después de tocar el campo o intentar guardar el formulario.
También se agregó un validador para que la duración solamente acepte bloques de 5 minutos. Por ejemplo, `45` es válido pero `47` no.
Al guardar un formulario válido solamente se muestra el objeto que se mandaría a la API. En esta práctica todavía no se hace el POST.

### ¿Dónde vive el valor de un campo en un formulario reactivo y qué diferencia tiene con useState?
En un formulario reactivo el valor está dentro del `FormControl` que forma parte del `FormGroup`.
En React normalmente se usaría `useState` y habría que actualizar el estado desde los eventos del input. En Angular el formulario ya se encarga de guardar el valor y también su estado de validación.

### ¿Qué regresa un validador propio?
Cuando el valor es válido regresa:

```text
null
```
Cuando no es válido regresa un objeto con el error. El nombre de ese error se puede consultar después con `hasError()` para mostrar el mensaje correspondiente.

## Catálogo desde la API
El catálogo dejó de usar las clases guardadas localmente y ahora obtiene los datos desde:

```text
GET http://localhost:3000/clases
```
También se muestran los estados de carga y error, y las imágenes se obtienen desde el backend.

### ¿Qué cambió en el servicio del catálogo y por qué los componentes no se enteraron?
Cambió la forma en la que el servicio obtiene las clases.
Antes las tomaba de un arreglo local y ahora utiliza `httpResource` para pedirlas al backend.
Los componentes siguieron usando el servicio de la misma forma, por eso no fue necesario cambiar cómo consumen el catálogo.

### ¿Por qué no hizo falta iniciar sesión para leer el catálogo?
Porque `GET /clases` es una ruta pública del backend.
Para consultar las clases no se necesita mandar un token ni iniciar sesión.

## Ejecutar

Backend:

```bash
cd gimnasio-backend
npm run start:dev
```

Frontend:

```bash
cd gimnasio-admin
ng serve
```

El backend corre en:

```text
http://localhost:3000
```

y el frontend en:

```text
http://localhost:4200
```

