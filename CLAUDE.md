# CLAUDE.md

Guía para trabajar en este repositorio con Claude Code.

## Proyecto

**Una Hurparfum** — tienda online de perfumes (SPA) hecha como trabajo práctico de la materia *Construcción de Interfaces* (Universidad). Es solo frontend: no hay backend, API ni base de datos; el catálogo es un array estático y el carrito vive en memoria (se pierde al recargar).

Todo el código, nombres de variables, componentes, props y textos de la UI están **en español**. Mantener esa convención (`agregarAlCarrito`, `cantidadTotal`, `productos`, etc.).

## Stack

- **React 19** + **Vite 8** (JavaScript/JSX, sin TypeScript)
- **React Router DOM 7** (`BrowserRouter` en `src/main.jsx`, `Routes` en `src/App.jsx`)
- **Tailwind CSS 4** vía plugin `@tailwindcss/vite` (sin `tailwind.config.js`; el tema se define con `@theme` en `src/index.css`)
- **ESLint 10** (flat config) con `react-hooks` y `react-refresh`
- Fuentes de Google Fonts cargadas en `index.html`: Inter (texto) y Playfair Display (títulos)

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo (Vite, http://localhost:5173)
npm run build     # build de producción en dist/
npm run preview   # servir el build
npm run lint      # ESLint
```

No hay tests configurados.

## Estructura

```
index.html                 # HTML raíz + Google Fonts
src/
  main.jsx                 # monta <App/> dentro de <StrictMode> y <BrowserRouter>
  App.jsx                  # rutas + estado global del carrito
  index.css                # import de Tailwind + @theme (colores y fuentes)
  App.css                  # restos del template de Vite, NO se importa (se puede borrar)
  components/
    NavBar.jsx             # header sticky, menú hamburguesa en mobile, badge del carrito
  data/
    productos.js           # catálogo estático (16 perfumes) + `categorias`
  pages/
    Home.jsx               # /
    Productos.jsx          # /productos            (catálogo + filtro por categoría)
    DetalleProducto.jsx    # /producto/:id
    Carrito.jsx            # /carrito
    Contacto.jsx           # /contacto              (formulario / finalizar compra)
public/
  favicon.svg, icons.svg
  img/                     # (a crear) imágenes de productos
```

## Rutas y props

Definidas en `src/App.jsx`:

| Ruta | Página | Props que recibe |
|---|---|---|
| `/` | `Home` | — |
| `/productos` | `Productos` | `agregarAlCarrito` |
| `/producto/:id` | `DetalleProducto` | `agregarAlCarrito` (el id se lee con `useParams`) |
| `/carrito` | `Carrito` | `carrito`, `total`, `cantidadTotal`, `cambiarCantidad`, `eliminarDelCarrito`, `vaciarCarrito` |
| `/contacto` | `Contacto` | `carrito`, `vaciarCarrito` |

`NavBar` recibe `cantidadTotal` para el badge.

## Estado del carrito

El estado vive en `App.jsx` con `useState` y se pasa por props (no hay Context ni librería de estado). Cada item del carrito es el producto completo más `cantidad`.

- `agregarAlCarrito(producto)` — suma 1 o agrega con `cantidad: 1`; **nunca supera `producto.stock`**.
- `cambiarCantidad(id, delta)` — `delta` = `+1` / `-1`; mantiene la cantidad entre 1 y `stock`.
- `eliminarDelCarrito(id)`, `vaciarCarrito()`.
- `cantidadTotal` y `total` son **valores derivados** calculados en cada render (no guardarlos en otro `useState`).

Siempre usar actualizaciones funcionales (`setCarrito(prev => ...)`) e inmutables.

## Datos (`src/data/productos.js`)

Cada producto:

```js
{
  id: number,
  nombre: string,
  categoria: "Hombre" | "Mujer" | "Unisex",
  precio: number,            // en pesos, entero (ej. 85000)
  imagen: string,            // "/img/<slug>.jpg" -> archivo en public/img/
  descripcion: string,
  stock: number,             // 0 = sin stock (deshabilitar "Agregar")
  etiqueta: string | null,   // "Más vendido" | "Nuevo" | "Oferta" | null
  caracteristicas: string[], // ml, concentración, notas, duración
}
```

También exporta `categorias` (lista sin repetidos) para el filtro del catálogo. Productos con `stock: 0`: id 6 y 12.

## Diseño / estilos

Tema definido en `src/index.css`:

| Token | Valor | Clases Tailwind |
|---|---|---|
| `--color-base` | `#2f2a25` (marrón oscuro) | `bg-base`, `text-base`*, `border-base` |
| `--color-dorado` | `#f3ca4c` (dorado) | `bg-dorado`, `text-dorado`, `border-dorado/30` |
| `--color-claro` | `#f2f0ef` (crema) | `bg-claro`, `text-claro` |
| `--font-titulo` | Playfair Display | `font-titulo` |
| `--font-sans` | Inter | fuente por defecto |

Estética: lujo/elegante — fondo claro, header oscuro con acentos dorados, títulos en serif, enlaces en mayúsculas con `tracking-widest`. Responsive mobile-first (breakpoint `md:` para escritorio). Usar solo clases de Tailwind y los tokens del tema; no agregar CSS suelto.

\* **Ojo:** `text-base` choca con la utilidad de tamaño de fuente de Tailwind (`text-base` = 1rem). Para color de texto oscuro preferir `text-[--color-base]` / `text-(--color-base)` o renombrar el token (ej. `--color-oscuro`).

## Estado actual y problemas conocidos

- Las páginas (`Home`, `Productos`, `DetalleProducto`, `Carrito`, `Contacto`) son **placeholders** que solo muestran un `<h1>`; falta implementarlas. `Home` tiene un `text-blue-400` de prueba.
- La carpeta `public/img/` y las imágenes de productos todavía no existen.
- `babel-plugin-react-compiler` y `@rolldown/plugin-babel` están en devDependencies, pero `vite.config.js` no los usa (el React Compiler no está activo).
- `README.md` es el del template de Vite y `App.css` es código muerto del template.
- No es un repositorio git todavía.

## Convenciones

- Componentes funcionales con `function Nombre() {}` + `export default Nombre;` al final del archivo.
- Comentario con la ruta del archivo en la primera línea (`// src/App.jsx`).
- Comentarios breves en español explicando el *por qué* (estilo didáctico).
- Navegación interna con `Link` / `NavLink` de react-router-dom, nunca `<a href>`.
- Formatear precios en pesos argentinos (ej. `precio.toLocaleString("es-AR")`).
