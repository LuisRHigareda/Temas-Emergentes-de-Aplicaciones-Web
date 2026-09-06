## Preguntas de reflexión - Práctica 4

### 1. Express manda los rechazos de un handler async directo al middleware de errores, sin try/catch en cada ruta. ¿Qué tendrían que agregar en cada ruta si esto no fuera así?

Si Express no enviara automáticamente los errores de los handlers async al middleware de errores, tendríamos que agregar un bloque try/catch en cada ruta. Dentro del catch tendríamos que pasar el error al siguiente middleware, por ejemplo usando next(error). Esto repetiría código en todos los endpoints.

### 2. ¿Por qué el servicio no lanza directamente un 409 en vez de EjemplarPrestadoError?

Porque el Service pertenece a la lógica de negocio y no debería depender de HTTP. Para el Service lo importante es indicar que el ejemplar ya está prestado mediante un error de dominio. Después, la capa HTTP decide que ese error corresponde a un código 409. De esta manera el mismo Service podría utilizarse desde otro tipo de aplicación sin depender de códigos HTTP.

### 3. Si mañana agregaran una app móvil que también consume esta API, ¿qué archivos de esta práctica tendrían que tocar?

No sería necesario cambiar la capa de dominio ni el Service. La aplicación móvil podría consumir los mismos endpoints y utilizar el mismo contrato de la API. Solo habría que desarrollar el nuevo cliente móvil y, si necesitara alguna operación que todavía no existe, entonces sí habría que agregar el endpoint correspondiente en la capa HTTP.