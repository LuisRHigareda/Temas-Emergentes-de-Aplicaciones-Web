# Práctica 6 - Conectar el dominio con la API

## Preguntas de reflexión

### 1. ¿Qué pasaría si el módulo no quedara registrado en la raíz?

Si el módulo no estuviera agregado en `AppModule`, Nest no sabría que existe. Entonces sus controladores y servicios no se cargarían y las rutas de ese módulo no funcionarían.

### 2. ¿Por qué los métodos del repositorio devuelven promesas si los datos van a estar en memoria?

Aunque en esta práctica los datos están en memoria, usar promesas permite que el código quede preparado para trabajar después con una base de datos. Así el Service no tendría que cambiar demasiado si el repositorio se reemplaza por otra implementación.

### 3. ¿Qué error apareció al cambiar a la interfaz, y por qué la clase sí se había resuelto sola?

Al cambiar la clase concreta por la interfaz, Nest mostró un error diciendo que no podía resolver la dependencia de `InscripcionesService`. Esto pasa porque la interfaz solo existe en TypeScript y ya no está disponible cuando la aplicación se ejecuta. En cambio, una clase sí existe en tiempo de ejecución y Nest puede identificarla directamente.

### 4. ¿Por qué el servicio necesita un token para el repositorio, pero el controlador no lo necesita para el servicio?

El repositorio se inyecta usando una interfaz, así que Nest necesita un token para saber qué clase concreta debe usar. El controlador no necesita eso para el Service porque `InscripcionesService` sí es una clase real y Nest puede reconocerla directamente.

### 5. ¿Cuál es la diferencia entre un 400 y un 409?

El 400 aparece cuando la petición está mal formada o le faltan datos necesarios. El 409 aparece cuando la petición sí está bien escrita, pero entra en conflicto con una regla del sistema, por ejemplo intentar inscribir dos veces al mismo miembro o querer entrar a un horario que ya está lleno.

### 6. ¿Por qué cambió el código de estado de esa última petición?

Primero la inscripción del miembro 3 dio 409 porque el horario ya tenía ocupados sus dos lugares. Después cancelamos una inscripción y se liberó un espacio. Al volver a mandar la misma petición, ya había cupo y por eso sí se pudo crear la inscripción con un 201.