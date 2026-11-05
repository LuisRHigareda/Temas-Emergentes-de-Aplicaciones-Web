# Práctica 20 - Signals, servicio y filtro
En esta práctica se movió el estado del catálogo a un servicio de Angular usando `signal` y `computed`.
También se agregó un filtro por categoría, selección de clases y un panel lateral para mostrar el detalle de la clase seleccionada.

## Servicio del catálogo
El servicio `Catalogo` guarda:
- las clases
- la categoría seleccionada
- la clase elegida
Las clases visibles y los minutos totales se calculan con `computed()` dependiendo del filtro seleccionado.

### ¿Qué diferencia hay entre un signal y un computed?
Un `signal` guarda un valor que puede cambiar.
Por ejemplo, la categoría elegida puede cambiar cuando se presiona uno de los botones del filtro.
Un `computed` obtiene un valor a partir de otros signals. En este caso se usa para obtener las clases visibles y los minutos del filtro.
Comparándolo con React:

```text
signal   -> parecido a useState
computed -> parecido a useMemo
```

## Filtro
Se creó el componente `filtro-categoria` para cambiar la categoría del catálogo.
El componente obtiene el servicio con:

```ts
inject(Catalogo)
```
Al seleccionar una categoría se actualizan las clases visibles y también cambia el resumen.
Si una clase estaba seleccionada y después se cambia a un filtro donde esa clase ya no aparece, la selección se limpia.

### ¿Qué pasaría si el filtro usara new Catalogo() en lugar de inject(Catalogo)?
Se crearía otra instancia del servicio.
Eso significa que el filtro tendría su propio estado y no estaría usando el mismo catálogo que el resto de la aplicación.
Con `inject(Catalogo)` los componentes trabajan con la misma instancia del servicio.

## Tarjeta y detalle
La tarjeta recibe la clase mediante un `input()`.
También se agregó un `output()` para avisarle al componente padre cuando se selecciona una tarjeta.
La clase seleccionada se muestra en un panel lateral con su información.
