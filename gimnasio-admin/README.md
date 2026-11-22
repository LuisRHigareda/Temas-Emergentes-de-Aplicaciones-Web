# Práctica 23 - El buscador con RxJS

En esta práctica agregué un buscador de clases por nombre al panel del gimnasio. El texto se manda a la API después de dejar de escribir por un momento. Cuando se hace otra búsqueda, se cancela la petición anterior para no mostrar resultados atrasados. Se conservaron el filtro por categoría, el login y las opciones de crear, editar y eliminar de la Práctica 22.

## Preguntas

**1. ¿Qué diferencia hay entre un signal y un Observable?**

Un signal guarda un valor que se puede consultar directamente y que Angular utiliza para actualizar la pantalla. Un Observable emite valores a lo largo del tiempo y permite trabajar con operadores como `switchMap` o `debounceTime`. Aquí usamos RxJS para controlar las peticiones y `toSignal` para mostrar su resultado en Angular.

**2. ¿Qué problema evita switchMap y qué pasaría con mergeMap?**

`switchMap` deja de escuchar la consulta anterior cuando llega un texto nuevo. Así evita que una respuesta vieja reemplace los resultados de la búsqueda más reciente. Con `mergeMap`, las consultas seguirían activas al mismo tiempo y podrían terminar en otro orden.

**3. ¿Qué pasa si se quita catchError y la API se apaga?**

El error podría terminar el Observable del buscador. Aunque después vuelva a encenderse la API, escribir otra palabra ya no iniciaría nuevas consultas desde esa suscripción. Con `catchError` dentro del `switchMap` mostramos el error y permitimos volver a buscar o reintentar.

## Cómo ejecutar

Se requiere MySQL y el backend del gimnasio configurado como en la Práctica 22. No es necesario volver a ejecutar el seed si ya están las clases.

Backend, desde `gimnasio-backend`:

```powershell
$env:RETARDO_MS = '1200'
npm run start:dev
```

El retardo sólo se usa para la captura de peticiones canceladas. Para utilizar el sistema normalmente se puede iniciar sin esa variable o asignarle `0`.

Frontend, desde `gimnasio-admin`:

```powershell
npm run start
```

Abrir `http://localhost:4200/entrar` e iniciar sesión con la cuenta de administrador que se usó en la Práctica 22. El backend responde en `http://localhost:3000`.

