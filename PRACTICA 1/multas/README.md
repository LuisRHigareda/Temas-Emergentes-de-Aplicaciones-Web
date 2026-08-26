# Práctica 1 - Descubriendo TypeScript

## Tópico de Aplicaciones Web

Proyecto realizado para comprobar las diferencias entre JavaScript y TypeScript, observar cómo TypeScript detecta errores de tipos y aprender a interpretar los mensajes del compilador.

---

## Paso 1. Crear el proyecto

Se creó la carpeta `multas`, se inicializó el proyecto de Node.js y se instaló TypeScript como dependencia de desarrollo.

Comandos utilizados:

```bash
npm init -y
npm install --save-dev typescript
npx tsc --init

Predicción: Creí que el programa imprimiría 400.

Resultado obtenido: El programa imprimió 35050.

Explicación: La multa "350" está almacenada como texto. Al utilizar el
operador + con un texto y el número 50, JavaScript concatena ambos valores
en lugar de sumarlos.

¿Hubo algún error, advertencia o mensaje en la consola que avisara?
No. El programa se ejecutó normalmente y JavaScript no mostró ningún error
ni advertencia.

¿Por qué Node ejecuta el archivo aunque tenga un error de tipos?
Porque el error de TypeScript es una comprobación de tipos. Node ejecuta
el código y las anotaciones de tipo no afectan la lógica de ejecución.

¿Cuál comando revisa y cuál ejecuta?
npx tsc --noEmit → revisa los tipos sin generar archivos.
node multas.ts → ejecuta el programa.

1. De las dos líneas que usan const, ¿por qué sólo una falla?
Porque const impide reasignar la variable completa, pero no impide
modificar las propiedades internas de un objeto.

Por eso:
libro.disponible = false;
sí está permitido.
Pero:
libro = { ... };
falla porque intenta asignar un objeto nuevo a una variable declarada
con const.

2. Al asignarle un texto a la variable con let, nadie escribió que
fuera un número. ¿De dónde salió ese tipo?
TypeScript infirió automáticamente el tipo a partir del valor inicial.
Como diasRetraso fue inicializada con el número 3, TypeScript dedujo
que su tipo era number. Por eso permite asignarle después 5, pero no
permite asignarle el texto "cinco".

Error 1
Clave: TS2322
Mensaje exacto: Type 'string' is not assignable to type 'number'.
¿Qué esperaba? Un valor de tipo number.
¿Qué recibió? Un valor de tipo string ("cien").
¿En qué línea? Línea 34.
Línea que provocó el error: prestamo.multa = "cien";

Error 2
Clave: TS2345
Mensaje exacto: Argument of type 'number' is not assignable to parameter of type 'Prestamo'.
¿Qué esperaba?Un argumento de tipo Prestamo.
¿Qué recibió?Un valor de tipo number (123).
¿En qué línea? Línea 34.
Línea que provocó el error:calcularMulta(123);

Error 3
Clave: TS2741
Mensaje exacto: Property 'folio' is missing in type '{ multa: number; ejemplar: number; estado: "activo"; }' but required in type 'Prestamo'.
¿Qué esperaba? Un objeto de tipo Prestamo que incluyera la propiedad obligatoria folio.
¿Qué recibió? Un objeto con multa, ejemplar y estado, pero sin la propiedad folio.
¿En qué línea? Línea 34.
Línea que provocó el error: const prestamoIncompleto: Prestamo = { multa: 100, ejemplar: 2, estado: "activo" };
