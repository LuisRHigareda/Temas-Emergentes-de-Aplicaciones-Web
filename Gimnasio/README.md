# Práctica 15 - Gimnasio

En esta práctica trabajé con React Router para separar las diferentes páginas del gimnasio.

Se agregó una página para ver las clases, otra para ver el detalle de cada clase y sus horarios, además de una página 404 para las rutas que no existen. Los datos se obtienen desde el backend del gimnasio.

## Rutas

Las rutas que se utilizaron son:

- `/` redirige a `/clases`
- `/clases` muestra todas las clases
- `/clases/:id` muestra la información de una clase
- cualquier otra ruta muestra el error 404

El encabezado y el pie se encuentran dentro del Layout, así que se siguen mostrando al cambiar de página.

## Ejercicio 1

### ¿Por qué el 404 sí tiene encabezado y pie?

Porque la página 404 también se encuentra dentro del Layout. Lo que cambia es el contenido que se muestra en medio, pero el encabezado y el pie siguen siendo los mismos.

### ¿Qué cambia en la pestaña Red si usas `<a href>` en lugar de `Link`?

Con `Link` se cambia de ruta sin volver a cargar toda la página.

Al cambiarlo temporalmente por `<a href>` pude ver en la pestaña Red que el navegador vuelve a pedir el documento y varios archivos de la aplicación. Esto pasa porque hace una navegación completa.

## Ejercicio 2

### ¿En qué tipo de dato llega el id de la URL y qué pasa si no lo conviertes?

El id que se obtiene con `useParams` llega como `string`.

En este caso se convierte a número antes de utilizarlo porque el servicio espera un id numérico. Si no se convierte, TypeScript marca que los tipos no coinciden.

### ¿Qué pasa al ir de `/clases/1` a `/clases/2` si el id no está en las dependencias del efecto?

El efecto no detectaría el cambio del id y podría seguir mostrando la información de la clase anterior aunque la URL ya haya cambiado.

Por eso el id se coloca en las dependencias del efecto.

## Ejecución

Primero se debe iniciar el backend:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run start:dev