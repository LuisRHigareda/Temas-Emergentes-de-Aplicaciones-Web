## Asignación - Módulo Horarios

### 1. ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?

Porque `HorariosService` es una clase y Nest puede reconocerla directamente. En cambio, `HorarioRepository` es una interfaz y necesita el token `HORARIO_REPOSITORY` para saber qué implementación debe usar.

### 2. Si mandas un claseId que no es número, ¿qué código de estado esperarías, y por qué este Controller no lo detecta?

Lo esperado sería un 400 porque el dato enviado no es válido. En este Controller no se detecta porque el tipo de TypeScript solo sirve mientras se desarrolla y no valida automáticamente los datos que llegan en la petición.

claseId: number no valida el JSON en tiempo de ejecución