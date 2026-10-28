# Práctica 17 - Rutas protegidas e inscripciones
En esta práctica se agregaron las inscripciones al gimnasio y se protegieron las páginas que necesitan una sesión iniciada.
Ahora, si un usuario intenta entrar a `Mis inscripciones` sin haber iniciado sesión, se manda a la página de entrar. Después del login regresa a la página que quería visitar.
También se agregó la inscripción a los horarios desde el detalle de cada clase.

## Ruta protegida
La página `/mis-inscripciones` solamente se puede abrir cuando hay una sesión.
Si no hay sesión se redirige a `/entrar`.

### ¿La ruta protegida hace segura la aplicación? ¿Qué protege realmente los datos?
No. La ruta protegida ayuda a evitar que una persona entre a ciertas páginas desde el frontend, pero la seguridad real está en el backend.

Aunque alguien intentara llamar directamente a la API, el backend sigue revisando el token JWT antes de entregar la información.

También se comprobó con `curl` que `/inscripciones/mias` sin token responde `401`.

## Inscripciones

Cuando hay una sesión iniciada, el botón `Inscribirme` manda el horario seleccionado al backend.
Si la inscripción funciona se muestra un mensaje y se vuelve