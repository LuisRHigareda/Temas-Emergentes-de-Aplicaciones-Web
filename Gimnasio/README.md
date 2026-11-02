# Práctica 18 - Lazy loading y Zustand
En esta práctica se trabajó con lazy loading para separar las páginas del gimnasio y también se agregó Zustand para manejar las inscripciones desde un mismo lugar.

## Lazy loading
Antes de hacer los cambios, el archivo principal de JavaScript pesaba:

```text
325.01 kB
```
Después de usar `React.lazy` quedó en:

```text
320.66 kB
```
Además se generaron archivos separados para varias páginas, por ejemplo:

```text
PaginaClases
PaginaClase
PaginaEntrar
PaginaRegistro
PaginaMisInscripciones
NoEncontrado
```
Desde la pestaña Network se pudo ver que estos archivos se descargan cuando se entra a cada ruta.
También se agregó `loading="lazy"` a las imágenes del catálogo.

### ¿Cuánto se ahorró y por qué el ahorro es pequeño?
El archivo principal bajó aproximadamente 4.35 kB.
El cambio no es tan grande porque la aplicación todavía es pequeña y varias dependencias siguen siendo compartidas por todas las páginas. Aun así, ahora cada página puede cargarse cuando realmente se necesita.

### ¿Por qué falla la API si el preview corre en el puerto 4173?
El backend permite peticiones desde `http://localhost:5173`.
Cuando el preview corre en `http://localhost:4173`, el origen cambia y el navegador bloquea la petición por CORS.
Para probar el build usando el puerto permitido se utilizó:

```bash
npm run preview -- --port 5173
```

## Zustand
Se creó un store para guardar las inscripciones del usuario.
Al iniciar sesión se cargan las inscripciones y al cerrar sesión se vacían.
El store se utiliza para:
- mostrar el número de inscripciones en el encabezado
- mostrar la lista de `Mis inscripciones`
- marcar un horario como `Inscrito`
- actualizar el contador después de una inscripción nueva

### ¿Cuándo conviene un contexto y cuándo un store?
El contexto sirve bien para datos sencillos que necesita toda la aplicación, como la sesión del usuario.
Un store como Zustand resulta más cómodo cuando el mismo estado se consulta o cambia desde varios lugares. Aquí serian las inscripciones se usan en el encabezado, el detalle de las clases y la página de mis inscripciones.

## Ejecutar
Backend:

```bash
cd backend
npx prisma db seed
npm run start:dev
```

Frontend:

```bash
npm install
npm run dev
```

Para generar el build:

```bash
npm run build
```

