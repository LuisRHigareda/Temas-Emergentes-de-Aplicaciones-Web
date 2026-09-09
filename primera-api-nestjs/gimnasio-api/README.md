# Práctica 5 - Mi primera API con NestJS

API básica desarrollada con NestJS para consultar y registrar clases de un gimnasio. Los datos se almacenan temporalmente en un arreglo en memoria.

## Endpoints

- `GET /` - Ruta inicial de la aplicación.
- `GET /clases` - Devuelve el catálogo completo de clases.
- `POST /clases` - Agrega una nueva clase al catálogo.

## Preguntas de reflexión

### 1. ¿Qué generó el comando `nest new`?

El comando `nest new` creó la estructura inicial de un proyecto NestJS, incluyendo los archivos principales de la aplicación, configuración de TypeScript, dependencias, pruebas y los archivos `main.ts`, `app.module.ts`, `app.controller.ts` y `app.service.ts`.

### 2. ¿Qué hace el AppService que ya viene generado?

El `AppService` generado por NestJS incluye un método llamado `getHello()` que originalmente devuelve el texto `Hello World!`. En esta práctica ese mensaje se modificó, pero el controlador sigue utilizando el servicio para responder la petición de la ruta principal.

### 3. ¿Por qué la ruta funciona sin declarar nada en app.module.ts?

Porque `AppController` ya está registrado dentro de `AppModule`. Al agregar un nuevo método con `@Get('clases')` dentro del mismo controlador, NestJS reconoce automáticamente esa ruta sin tener que registrar cada endpoint por separado en el módulo.

### 4. ¿Qué pasaría si el cuerpo de la petición viniera vacío?

Con la implementación actual no existe una validación del cuerpo. Por lo tanto, el método recibiría un objeto vacío, lo agregaría al arreglo y lo devolvería. Para evitarlo sería necesario agregar validaciones antes de guardar la información.

### 5. ¿En qué archivo vive hoy toda la lógica de la práctica?

Actualmente la lógica del catálogo está concentrada principalmente en `src/app.controller.ts`, porque ahí se encuentra el arreglo de clases y los métodos que atienden las peticiones GET y POST.