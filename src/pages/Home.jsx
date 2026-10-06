// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

// Botellas que se muestran en la portada (por id)
const idsPortada = [10, 7, 12];

// Cada categoría usa la foto de un perfume representativo
const tarjetasCategoria = [
    { nombre: "Hombre", texto: "Intensos, especiados y amaderados.", idImagen: 2 },
    { nombre: "Mujer", texto: "Florales, frutales y envolventes.", idImagen: 8 },
    { nombre: "Unisex", texto: "Oud, ámbar y gourmands para todos.", idImagen: 15 },
];

const beneficios = [
    { titulo: "100% originales", texto: "Trabajamos solo con fragancias auténticas de cada casa." },
    { titulo: "Envíos a todo el país", texto: "Recibí tu perfume en la puerta de tu casa." },
    { titulo: "Asesoramiento", texto: "Te ayudamos a encontrar la fragancia ideal para vos." },
];

// Busca un producto por id (se usa para las imágenes de portada y categorías)
const buscarProducto = (id) => productos.find((p) => p.id === id);

function Home({ agregarAlCarrito }) {
    // Destacados: los más vendidos que tienen stock, así se pueden agregar al carrito
    const destacados = productos.filter(
        (p) => p.etiqueta === "Más vendido" && p.stock > 0
    );

    return (
        <>
            {/* Portada */}
            <section className="bg-base text-claro">
                <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-dorado">
                            Perfumería árabe y de nicho
                        </span>
                        <h1 className="mt-3 font-titulo text-5xl leading-tight text-dorado md:text-6xl">
                            Una Hurparfum
                        </h1>
                        <p className="mt-4 max-w-md text-claro/80">
                            Fragancias de Oriente con carácter: oud, ámbar, especias y flores
                            de las casas más reconocidas, como Amouage, Lattafa y Armaf.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/productos"
                                className="rounded-lg bg-dorado px-6 py-3 text-sm font-semibold uppercase tracking-widest text-base transition-colors hover:bg-claro"
                            >
                                Ver catálogo
                            </Link>
                            <Link
                                to="/contacto"
                                className="rounded-lg border border-dorado/50 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-dorado transition-colors hover:border-dorado hover:bg-dorado/10"
                            >
                                Contacto
                            </Link>
                        </div>
                    </div>

                    {/* Botellas: la del medio un poco más arriba para dar movimiento */}
                    <div className="grid grid-cols-3 items-end gap-3 md:gap-4">
                        {idsPortada.map((id, i) => {
                            const producto = buscarProducto(id);
                            return (
                                <Link
                                    key={id}
                                    to={`/producto/${id}`}
                                    className={`overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:-translate-y-1 ${i === 1 ? "mb-8" : ""
                                        }`}
                                >
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className="aspect-[3/4] w-full object-contain p-2"
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Destacados */}
            <section className="mx-auto max-w-6xl px-4 py-16">
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <h2 className="font-titulo text-3xl">Los más elegidos</h2>
                        <p className="mt-1 text-base/70">
                            Las fragancias favoritas de nuestros clientes.
                        </p>
                    </div>
                    <Link
                        to="/productos"
                        className="text-sm uppercase tracking-widest underline hover:text-base/70"
                    >
                        Ver todos
                    </Link>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {destacados.map((producto) => (
                        <ProductoCard
                            key={producto.id}
                            producto={producto}
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    ))}
                </div>
            </section>

            {/* Categorías: llevan al catálogo ya filtrado con ?categoria= */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-6xl px-4">
                    <h2 className="text-center font-titulo text-3xl">Comprá por categoría</h2>

                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {tarjetasCategoria.map((cat) => {
                            const producto = buscarProducto(cat.idImagen);
                            return (
                                <Link
                                    key={cat.nombre}
                                    to={`/productos?categoria=${cat.nombre}`}
                                    className="group flex items-center gap-4 rounded-xl border border-base/10 bg-claro p-4 transition-shadow hover:shadow-lg"
                                >
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className="h-28 w-24 shrink-0 rounded-lg bg-white object-contain p-2"
                                    />
                                    <div>
                                        <h3 className="font-titulo text-2xl">{cat.nombre}</h3>
                                        <p className="mt-1 text-sm text-base/70">{cat.texto}</p>
                                        <span className="mt-3 inline-block text-xs uppercase tracking-widest group-hover:underline">
                                            Ver perfumes →
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Por qué elegirnos */}
            <section className="mx-auto max-w-6xl px-4 py-16">
                <div className="grid gap-8 text-center md:grid-cols-3">
                    {beneficios.map((beneficio) => (
                        <div key={beneficio.titulo}>
                            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base text-xl text-dorado">
                                ✦
                            </span>
                            <h3 className="mt-4 font-titulo text-xl">{beneficio.titulo}</h3>
                            <p className="mt-2 text-sm text-base/70">{beneficio.texto}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Llamado final */}
            <section className="bg-base">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center">
                    <h2 className="font-titulo text-3xl text-dorado">¿No sabés cuál elegir?</h2>
                    <p className="max-w-md text-claro/80">
                        Contanos qué aromas te gustan y te recomendamos el perfume ideal.
                    </p>
                    <Link
                        to="/contacto"
                        className="mt-2 rounded-lg bg-dorado px-6 py-3 text-sm font-semibold uppercase tracking-widest text-base transition-colors hover:bg-claro"
                    >
                        Escribinos
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Home;
