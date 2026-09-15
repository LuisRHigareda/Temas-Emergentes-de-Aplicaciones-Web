# Práctica 7 - Módulo Miembros

## Preguntas de reflexión

### 1. ¿Por qué esta interfaz no menciona Express, NestJS ni memoria?

Porque la interfaz solo dice qué funciones debe tener el repositorio. No importa todavía si los datos se guardan en memoria o después en una base de datos.

### 2. ¿Qué palabra de esa clase es la que promete cumplir la interfaz del paso anterior?

La palabra es `implements`, porque con eso la clase indica que va a cumplir con los métodos que tiene `MiembroRepository`.

### 3. ¿Por qué este archivo no sabe qué es una petición HTTP?

Porque el Service no se encarga de recibir peticiones. Solo trabaja con los datos y llama al repositorio. Esa parte de las peticiones la maneja el Controller.

### 4. ¿Por qué el Service se inyecta sin token en el Controller, y el repositorio sí necesita uno?

Porque `MiembrosService` es una clase y Nest la puede reconocer directamente. En cambio, `MiembroRepository` es una interfaz y por eso necesita un token para saber qué implementación utilizar.

### 5. ¿Qué prueba, en los hechos, que agregar Miembros no rompió nada de Inscripciones?

Que después de agregar Miembros, las peticiones de Inscripciones siguieron funcionando igual que antes. Entonces agregar el nuevo módulo no afectó lo que ya estaba hecho.