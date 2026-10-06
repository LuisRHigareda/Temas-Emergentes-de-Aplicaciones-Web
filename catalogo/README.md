# Práctica 11 - Componentes con TypeScript puro

En esta práctica hicimos un catálogo de productos usando TypeScript y Web Components, sin utilizar frameworks
Se trabajó principalmente con dos componentes: un botón reutilizable y una tarjeta para mostrar los productos.

## Ejercicio 1 - Botón

Primero hice el componente `<boton-app>`.

El botón recibe la variante mediante el atributo `variante` y también puede recibir el atributo `deshabilitado`.

El texto que aparece dentro del botón se recibe por medio de un `slot`, así que podemos reutilizar el mismo componente con textos diferentes.

Probé las variantes primario, secundario y peligro, además de un botón deshabilitado

### ¿Qué pasa si cambio la variante desde el HTML?

El estilo del botón cambia sin tener que modificar el TypeScript

Por ejemplo:

```html
<boton-app variante="primario">
  Primario
</boton-app>