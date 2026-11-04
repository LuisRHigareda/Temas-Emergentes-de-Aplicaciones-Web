# Práctica 19 - Panel del gimnasio en Angular
En esta práctica se creó un panel de administración del gimnasio usando Angular.
El tablero muestra las clases disponibles y un resumen con el total de clases, los minutos semanales y cuántas clases duran 60 minutos o más.
También se creó un componente para mostrar cada clase por separado.

## Tablero
El proyecto trabaja con 8 clases guardadas localmente.
En el resumen se muestran:
- 8 clases
- 380 minutos a la semana
- 2 clases de 60 minutos o más
Las tarjetas muestran la imagen, nombre, descripción, categoría y duración de cada clase.
Las clases de 60 minutos o más muestran la etiqueta `Larga`.
También se agregaron botones para vaciar y restaurar el catálogo.
Cuando no hay clases se muestra un mensaje indicando que no hay clases para mostrar.

## ¿Qué archivo de Angular hace el papel de main.tsx, App.tsx y vite.config.ts?
En Angular se puede comparar así:
```text
React main.tsx       -> Angular src/main.ts
React App.tsx        -> Angular src/app/app.ts y app.html
React vite.config.ts -> Angular angular.json
```
`main.ts` inicia la aplicación.
`app.ts` y `app.html` contienen el componente principal y su plantilla.
`angular.json` contiene parte de la configuración general del proyecto.

## Tarjeta de clase
Se creó el componente `tarjeta-clase` para mostrar cada clase.
La información de la clase llega mediante:

```ts
input.required<Clase>()
```
### ¿Por qué clase() lleva paréntesis?
Porque `clase` es un input creado como signal.
Para obtener su valor se llama como una función, por eso se escribe:

```html
{{ clase().nombre }}
```

## ¿Para qué sirve track?
En el `@for` se utilizó:
```html
@for (clase of clases; track clase.id)
```
`track` ayuda a Angular a identificar cada elemento de la lista usando su id.
Así puede saber qué elemento cambió sin tener que volver a crear toda la lista.

## Errores probados
Durante la práctica también se provocaron los errores:
- `NG5002`
- `NG8001`
