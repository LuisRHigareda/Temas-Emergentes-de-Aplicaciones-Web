# Práctica 16 - Sesión con JWT
En esta práctica se agregó el inicio de sesión al proyecto del gimnasio usando React Context y JWT.
La sesión se guarda en `localStorage` para que no se pierda al recargar la página. También se agregó el registro de usuarios y un interceptor de Axios para enviar el token al backend.

## Ejercicio 1
### ¿Por qué se usa un contexto y no props para la sesión?
Porque la información de la sesión se usa en diferentes partes de la aplicación. Con el contexto no es necesario estar pasando el usuario y el token por varios componentes mediante props.
### ¿Qué pasa si un componente usa la sesión fuera del proveedor?
No tendría acceso a la información del contexto. En este caso el hook marca un error porque la sesión debe usarse dentro de `SesionProvider`.

## Ejercicio 2
Se agregó una página para iniciar sesión y otra para registrar una cuenta nueva.
Cuando el login es correcto, el backend devuelve un token JWT y los datos del usuario. Si las credenciales son incorrectas se muestra el mensaje que devuelve la API.
También se agregó un interceptor de Axios que manda el token de esta forma:

```text
Authorization: Bearer TOKEN
```

### ¿Dónde se guarda el token y qué riesgo tiene ese lugar?
El token se guarda en `localStorage`.
La ventaja es que la sesión continúa aunque se recargue la página. El riesgo es que, si algún código malicioso logra ejecutarse en la aplicación, podría leer la información guardada en `localStorage`.

## Ejecutar el proyecto

Backend:

```bash
cd backend
npx prisma generate
npx prisma db seed
npm run start:dev
```

Frontend:

```bash
npm install
npm run dev
```
