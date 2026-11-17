# Práctica 22 - Guardar, login y editar clases

En esta práctica continuamos con el panel de administración del gimnasio. Se agregó la opción para guardar clases en el backend, iniciar sesión como administrador, editar y eliminar clases. También se implementó una confirmación para evitar salir del formulario cuando hay cambios sin guardar.

## Ejercicio 1 - Guardar clases con POST

Se creó el servicio `clases-api` para enviar las clases al backend usando `HttpClient`. Al guardar una clase correctamente, el catálogo se actualiza y regresa a la lista.

También se probaron las validaciones del servidor y las respuestas 400 y 401. Primero se permitió temporalmente crear clases sin autenticación y después se restauró la protección del administrador.

**¿Si el formulario ya valida, por qué también valida el servidor?**

Porque alguien puede enviar datos directamente a la API sin utilizar el formulario. Las validaciones de Angular ayudan al usuario, pero el servidor debe comprobar que la información sea correcta antes de guardarla.

**¿Por qué httpResource para leer y HttpClient para crear, editar y eliminar?**

`httpResource` facilita consultar datos y actualizar la información que se muestra. `HttpClient` permite realizar las peticiones POST, PATCH y DELETE cuando el usuario presiona un botón.

**¿Qué pasa si se olvida subscribe()?**

La petición no se ejecuta porque los observables de `HttpClient` necesitan una suscripción. Por lo tanto, los cambios no llegarían al servidor.

## Ejercicio 2 - Login, interceptores y guardia

Se agregó el inicio de sesión y se protegieron las páginas del panel para que solamente pueda entrar un administrador. Los interceptores permiten enviar el token en las peticiones y manejar los errores de autenticación.

Se comprobó que la cuenta de miembro no puede acceder al panel y que un administrador puede crear clases utilizando su token.

**¿A qué piezas de React corresponden las rutas hijas, el interceptor y el guardia?**

Las rutas hijas son similares a las rutas anidadas de React Router con `Outlet`. El interceptor se parece a los interceptores de Axios y el guardia a una ruta protegida (`ProtectedRoute`).

**¿Cuándo se ejecuta el guardia y por qué salir() tiene que navegar al login?**

El guardia se ejecuta cuando se intenta entrar a una ruta protegida. Al cerrar sesión es necesario regresar al login para que el usuario no permanezca en el panel después de eliminar su sesión.

## Ejercicio 3 - Editar, eliminar y guarda de salida

Se reutilizó el formulario para crear y editar clases. Al seleccionar una clase, sus datos aparecen en el formulario y se pueden modificar. También se agregó la opción de eliminar con confirmación y una guarda para advertir cuando hay cambios sin guardar.

**¿Cómo decide el mismo formulario si manda POST o PATCH?**

Depende del ID recibido en la ruta. Si estamos creando una clase nueva, no hay ID y se utiliza POST. Si estamos editando una clase existente, se recibe su ID y se utiliza PATCH.

**¿Por qué el estado del formulario no se puede observar con computed()?**

Porque las propiedades del formulario reactivo, como `dirty` y `valid`, no son signals. `computed()` solamente detecta cambios en signals, por lo que se necesita consultar directamente el formulario o convertir sus cambios a una señal.

**¿Qué diferencia hay entre canActivate y canDeactivate, y qué casos no cubre la guarda de salida?**

`canActivate` controla si podemos entrar a una ruta, mientras que `canDeactivate` controla si podemos salir de ella. La guarda de salida funciona con la navegación de Angular, pero no necesariamente detecta cuando se cierra la pestaña, se recarga la página o se cierra el navegador.

## Evidencias

Las capturas de las pruebas están guardadas en la carpeta `evidencias`. Se incluyeron las respuestas 400 y 401, el rechazo de la cuenta de miembro, la creación mediante POST 201 con token, la edición con PATCH 200, la eliminación con DELETE 200 y la confirmación al salir con cambios sin