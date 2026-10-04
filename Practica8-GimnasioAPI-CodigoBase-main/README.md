## Práctica 10 - Blindar la API, JWT y OpenAPI

### Parte 1

#### ¿Por qué el filtro atrapa la clase base y no cada error por separado?

Porque los diferentes errores que usamos heredan de `ErrorDeDominio`. Así no necesitamos crear un filtro diferente para cada error. El mismo filtro los recibe y dependiendo del tipo de error decide qué código HTTP debe regresar.

#### ¿Por qué el middleware no podría decidir si un usuario tiene permiso para una ruta?

Porque el middleware se ejecuta antes de llegar al controlador y todavía no sabe exactamente qué método va a manejar la petición. Por eso sirve para cosas generales, como agregar el `X-Request-Id`, pero no es el mejor lugar para manejar permisos de una ruta.

#### ¿Por qué una petición que responde 409 no aparece en el registro del LoggingInterceptor?

Porque en el interceptor usamos `tap` para registrar las peticiones que terminan normalmente. Cuando ocurre un error, como el `409`, la ejecución se va al filtro de errores antes de llegar a esa parte del interceptor.

#### ¿Por qué el sobre rompe a un cliente que ya estuviera usando la API?

Porque cambia la forma en la que llega la respuesta. Antes el cliente recibía los datos directamente y ahora vienen dentro de `data`, junto con `meta`. Si un cliente estaba programado para leer la estructura anterior, tendría que modificarse.

#### Si el servidor respondió con los dos orígenes, ¿quién bloquea y a quién protege?

El que realmente aplica CORS es el navegador. El servidor todavía puede responder la petición, pero el navegador decide si el código de otra página puede leer esa respuesta. Por eso en REST Client la respuesta puede llegar aunque el origen no esté permitido.

---

### Parte 2

#### ¿Por qué el campo se llama passwordHash y no password?

Porque no estamos guardando la contraseña original del usuario. Lo que se guarda es el resultado que genera bcrypt, es decir, el hash. Por eso el nombre `passwordHash` describe mejor lo que realmente está almacenado.

#### ¿Por qué los dos errores del inicio de sesión dicen exactamente lo mismo?

Para no dar pistas sobre si un correo existe o no en el sistema. Si la API respondiera algo diferente para un correo inexistente y para una contraseña incorrecta, sería más fácil descubrir qué usuarios están registrados.

#### Si el contenido de un JWT se puede leer, ¿qué es lo que protege la firma?

La firma sirve para comprobar que el token no fue modificado. El contenido del JWT se puede ver, como comprobamos en jwt.io, pero si alguien cambia por ejemplo el rol de `miembro` a `admin`, la firma ya no sería válida y la API rechazaría el token.

#### ¿Por qué es más seguro proteger todo y abrir a mano que hacerlo al revés?

Porque así cualquier ruta nueva queda protegida desde el inicio. Si queremos que una ruta sea pública, tenemos que indicarlo nosotros con `@Publico()`. De la otra forma sería más fácil olvidar proteger alguna ruta.

#### ¿Cuál es la diferencia entre un 401 y un 403?

El `401` aparece cuando el usuario no está autenticado correctamente, por ejemplo si no manda un token o el token no es válido.

El `403` aparece cuando sí sabemos quién es el usuario, pero su cuenta no tiene permiso para hacer esa acción.

En las pruebas se pudo ver esto al intentar cancelar una inscripción: sin token respondió `401`, con Karla respondió `403` y con el entrenador respondió `200`.

#### ¿Cuántas líneas del AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?

No tuve que cambiar ninguna línea del `AuthService`. Lo único que cambió fue la implementación del repositorio en `AuthModule`, pasando de `UsuarioMemoriaRepository` a `UsuarioPrismaRepository`.

Esto funciona porque el servicio depende de `UsuarioRepository` y no directamente de una implementación específica.

#### ¿Por qué es importante tomar al usuario de los claims del token y no de un parámetro de la URL o del cuerpo?

Porque el cliente puede modificar fácilmente lo que manda en el body o en la URL.

Por ejemplo, Karla podría enviar `miembroId: 3` aunque su cuenta realmente pertenece al miembro 1. Por eso usamos el `miembroId` que viene firmado dentro del JWT para comprobar quién está haciendo la petición.

En la prueba, cuando Karla intentó inscribir al miembro 3, la API respondió `403`.