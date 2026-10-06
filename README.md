# Una Hurparfum

Tienda online de perfumes desarrollada como trabajo práctico de la materia **Construcción de Interfaces** (Universidad).

## Descripción

**Una Hurparfum** es una SPA (Single Page Application) de una perfumería con estética elegante. Permite:

- Ver la página de inicio de la tienda.
- Recorrer el catálogo de perfumes y filtrarlo por categoría (Hombre, Mujer, Unisex).
- Ver el detalle de cada producto (descripción, precio, características y stock).
- Agregar productos al carrito, modificar cantidades (respetando el stock disponible) y eliminarlos.
- Completar un formulario de contacto para finalizar la compra.

El proyecto es solo frontend: no tiene backend ni base de datos. El catálogo se carga desde un archivo estático (`src/data/productos.js`) y el carrito se guarda en memoria, por lo que se pierde al recargar la página.

## Tecnologías utilizadas

- [React 19](https://react.dev/) — librería para construir la interfaz.
- [Vite 8](https://vite.dev/) — herramienta de desarrollo y build.
- [React Router DOM 7](https://reactrouter.com/) — navegación entre páginas.
- [Tailwind CSS 4](https://tailwindcss.com/) — estilos con clases utilitarias.
- [ESLint](https://eslint.org/) — análisis estático del código.
- Google Fonts: Inter y Playfair Display.

## Instalación y ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) 20.19 o superior (recomendado: la última versión LTS).
- npm (viene incluido con Node.js).

### Pasos

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Nano1104/una-hurperfumes.git
   cd una-hurperfumes
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Levantar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir en el navegador la URL que muestra la consola (por defecto <http://localhost:5173>).

### Otros comandos

| Comando           | Descripción                                       |
| ----------------- | ------------------------------------------------- |
| `npm run build`   | Genera el build de producción en la carpeta `dist/`. |
| `npm run preview` | Sirve localmente el build de producción.          |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto.                 |

## Integrantes del grupo

- Mariano Gil
- _Nombre y apellido_
- _Nombre y apellido_

## Capturas de pantalla

<!-- Agregar las imágenes en una carpeta (ej. docs/capturas/) y descomentar: -->
<!-- ![Inicio](docs/capturas/inicio.png) -->
<!-- ![Catálogo](docs/capturas/productos.png) -->
<!-- ![Carrito](docs/capturas/carrito.png) -->

_Próximamente._

## Deploy

_Pendiente._ <!-- Reemplazar por el link, ej: https://una-hurparfum.vercel.app -->
