# Práctica 12A - Hola React
En esta práctica trabajamos con React y TypeScript usando Vite. También hicimos una prueba con SWC para ver cómo se transforma el JSX antes de ejecutarse.

## 1. JSX con SWC
Primero intenté compilar `saludo.jsx` sin configurar SWC y apareció un error de sintaxis porque todavía no estaba habilitado el uso de JSX, después probé los modos clásico y automático.

### ¿En qué se convirtió cada etiqueta del JSX?
En modo clásico las etiquetas se convirtieron en llamadas a:

```js
React.createElement(...)
```
En modo automático se usaron funciones como:

```js
_jsx()
_jsxs()
```
del `react/jsx-runtime`.

### Si React es "sólo una biblioteca", ¿quién traduce el JSX?
Lo traduce una herramienta de compilación. En la prueba usamos SWC y en el proyecto con Vite esa transformación se realiza durante el desarrollo y la compilación.

## 2. React sin JSX
También hice un ejemplo usando `createElement` para crear un título y una tarjeta sin escribir JSX.

### ¿Qué hace createRoot y qué hace render?
`createRoot` conecta React con el elemento `root` del HTML.
`render` indica qué contenido se va a mostrar dentro de ese elemento.

## 3. Componente Saludo
Se creó un componente `Saludo` que recibe el nombre mediante props. También probé quitar la prop `nombre` y TypeScript mostró un error porque estaba definida como obligatoria.

### ¿Por qué el nombre de un componente empieza con mayúscula?
Porque React usa la mayúscula para distinguir los componentes propios de las etiquetas normales de HTML.
Por ejemplo:

```tsx
<Saludo />
```
es un componente, mientras que:

```html
<div>
```
es una etiqueta de HTML.

## 4. Tarjetas e insignias

Se hicieron los componentes `TarjetaPerfil` e `Insignia`.
Cada tarjeta recibe nombre, carrera y semestre. Si el semestre es 7 o mayor también aparece la insignia `Por egresar`.

### ¿Cuál es la diferencia entre semestre="8" y semestre={8}?
```tsx
semestre="8"
```
manda el valor como texto.
Pero:

```tsx
semestre={8}
```
manda el valor como número, como `semestre` está definido como `number`, usamos la segunda forma

## Evidencias
Las capturas están en la carpeta `evidencias`
