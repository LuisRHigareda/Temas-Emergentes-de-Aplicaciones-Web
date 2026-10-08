# Asignación 3 - Tabla genérica y un componente más

## Tabla genérica

Se agregó el componente `<tabla-generica>` para mostrar los productos que se van agregando al carrito.
La tabla recibe sus columnas y filas mediante propiedades porque ambos datos son arreglos.
Cuando el carrito está vacío se muestra `Sin datos`. Al agregar productos aparecen el nombre, precio y cantidad. El botón `Vaciar` también limpia la tabla.

### ¿Por qué se puede llamar genérica?
Porque la tabla no está hecha específicamente para productos. Recibe las columnas que debe mostrar y una lista de objetos con los datos.
Para mostrar alumnos en lugar de productos solamente tendría que cambiar las columnas y las filas que se le pasan. El componente de la tabla no tendría que modificarse.

## Componente adicional
Elegí hacer una alerta que se puede cerrar.
Se hicieron tres tipos:
- éxito
- aviso
- error
El mensaje se coloca mediante un `slot` y el tipo se recibe mediante el atributo `tipo`.
Al presionar la `×`, la alerta manda el evento `alerta-cerrada` y después se oculta.

### Contrato del componente
**¿Qué recibe?**
Recibe el atributo `tipo` y el mensaje mediante un `slot`.
**¿Qué avisa?**
Cuando se cierra manda el evento `alerta-cerrada`.
**¿Qué guarda adentro?**
Dentro del Shadow DOM guarda la estructura de la alerta, sus estilos y el botón para cerrarla.

## Evidencias
Las capturas de la asignación se encuentran en la carpeta `evidencias`
