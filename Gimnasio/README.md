# Práctica 24 - El gimnasio instalable (PWA)
Esta práctica se hizo sobre el proyecto React del gimnasio de la Práctica 18. Se agregó soporte PWA para instalarlo y abrir las páginas visitadas aun cuando no haya conexión. También se añadieron los botones de instalar y compartir, un aviso de conexión y una vibración breve después de una inscripción exitosa.

## Cómo ejecutarlo

Primero encender MySQL y la API desde `gimnasio-backend` (el backend de las prácticas 22 y 23, que permite el origen `http://localhost:4173`):

```powershell
npm run start:dev
```

Desde la carpeta `Gimnasio` de este repositorio:

```powershell
npm install
npm run build
npm run preview
```

Abrir `http://localhost:4173/clases`. El servicio debe estar en `http://localhost:3000`. Si se usa otra dirección, configurar `VITE_API_URL` antes de compilar. Para probar la PWA hay que usar `build` y `preview`, no `dev`.

## Preguntas

**¿Cuáles son los tres requisitos de una PWA y qué hace cada uno?**
Un manifiesto indica el nombre, los íconos y cómo se abre la aplicación. El service worker guarda recursos y permite abrir la aplicación cuando falla la conexión. Por último, se necesita un contexto seguro (HTTPS o localhost) para registrar el service worker y utilizar las funciones del navegador.

**¿Qué archivos generó vite-plugin-pwa en dist/ y para qué sirve cada uno?**
`manifest.webmanifest` contiene los datos para instalar la aplicación. `sw.js` es el service worker que controla la caché y la navegación. `registerSW.js` registra el service worker desde el navegador.

**¿Por qué las clases usan NetworkFirst y las imágenes CacheFirst?**
Las clases y sus horarios pueden cambiar, por lo que se consulta primero el servidor y se usa la versión guardada cuando no hay red. Las imágenes cambian poco, así que conviene reutilizar las que ya están en caché para que carguen más rápido.

**¿Por qué en npm run dev no hay service worker?**
Porque se dejó desactivado en desarrollo. El plugin genera y registra el service worker durante la compilación para producción. Se comprueba con `npm run build` y `npm run preview`.

**¿Qué diferencia hay entre una PWA y una aplicación híbrida?**
La PWA es una aplicación web que se puede instalar desde el navegador y usa sus APIs disponibles. Una aplicación híbrida se empaqueta en un contenedor nativo y puede acceder a funciones del dispositivo mediante plugins o puentes nativos.
