
## Preguntas de reflexión

### 1. ¿Qué línea del Service o del Controller tuvo que cambiar para que Clases hablara con MySQL?

No fue necesario cambiar ninguna línea del Service ni del Controller. El cambio se hizo en el módulo, sustituyendo `ClaseMemoriaRepository` por `ClasePrismaRepository`.

### 2. ¿Por qué InscripcionesService no tuvo que cambiar ni una línea de las reglas de cupo y duplicados?

Porque el Service trabaja con la interfaz `InscripcionRepository` y no con una implementación específica. El repositorio cambió de memoria a Prisma, pero los métodos que utiliza el Service siguen siendo los mismos.

### 3. ¿Por qué una interfaz no puede validar nada en tiempo de ejecución?

Porque las interfaces de TypeScript solamente se utilizan durante la compilación y desaparecen cuando el código se convierte a JavaScript. Una clase sí existe durante la ejecución y por eso puede utilizar los decoradores de `class-validator`.

### 4. ¿Qué código de estado responde la validación y qué trae en el cuerpo?

Cuando los datos no cumplen con el DTO la API responde con código `400 Bad Request`. En el cuerpo aparecen los mensajes de validación, además de `error` y `statusCode`.

### 5. ¿Cuántas líneas quedó más corto el controlador?

El controlador quedó 25 líneas más corto. Antes tenía 75 líneas y después de mover el manejo de errores al filtro quedó con 50.

### 6. Si la respuesta llega con los dos orígenes, ¿quién bloquea realmente y a quién protege?

El que aplica CORS es el navegador. REST Client puede recibir la respuesta aunque el origen no esté permitido, pero un navegador evita que el código de una página de otro origen pueda leerla. CORS protege principalmente al usuario que está utilizando el navegador.