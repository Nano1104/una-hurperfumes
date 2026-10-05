// src/pages/DetalleProducto.jsx
import { Link, useParams } from "react-router-dom";
import { productos } from "../data/productos";

function DetalleProducto({ agregarAlCarrito }) {
    // useParams devuelve los parámetros de la URL como strings: { id: "3" }
    const { id } = useParams();
    const producto = productos.find((p) => p.id === Number(id));

    // Si el id no existe (ej: /producto/999), mostramos un mensaje en vez de romper
    if (!producto) {
        return (
            <section className="mx-auto max-w-3xl px-4 py-16 text-center">
                <h1 className="font-titulo text-3xl">Producto no encontrado</h1>
                <p className="mt-2 text-base/70">
                    El perfume que buscás no existe o ya no está disponible.
                </p>
                <Link
                    to="/productos"
                    className="mt-6 inline-block rounded-lg bg-base px-5 py-2 text-dorado transition-colors hover:bg-dorado hover:text-base"
                >
                    Volver al catálogo
                </Link>
            </section>
        );
    }

    const { nombre, categoria, precio, imagen, descripcion, stock, etiqueta, caracteristicas } =
        producto;
    const sinStock = stock === 0;

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <Link
                to="/productos"
                className="text-sm underline hover:text-base/70"
            >
                ← Volver al catálogo
            </Link>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
                {/* Imagen ampliada */}
                <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
                    <img
                        src={imagen}
                        alt={nombre}
                        className={`aspect-square w-full object-cover ${sinStock ? "opacity-50 grayscale" : ""
                            }`}
                    />
                    {etiqueta && !sinStock && (
                        <span className="absolute left-4 top-4 rounded bg-dorado px-3 py-1 text-xs font-semibold uppercase tracking-wide text-base">
                            {etiqueta}
                        </span>
                    )}
                </div>

                {/* Información */}
                <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-widest text-base/60">
                        {categoria}
                    </span>
                    <h1 className="mt-1 font-titulo text-4xl">{nombre}</h1>
                    <p className="mt-4 text-3xl font-semibold">
                        ${precio.toLocaleString("es-AR")}
                    </p>

                    <p
                        className={`mt-2 text-sm font-medium ${sinStock ? "text-red-700" : "text-green-700"
                            }`}
                    >
                        {sinStock ? "Sin stock · No disponible" : `Stock disponible: ${stock} unidades`}
                    </p>

                    <p className="mt-6 text-base/80">{descripcion}</p>

                    <h2 className="mt-6 font-titulo text-xl">Características</h2>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-base/80">
                        {caracteristicas.map((caracteristica) => (
                            <li key={caracteristica}>{caracteristica}</li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => agregarAlCarrito(producto)}
                            disabled={sinStock}
                            className="rounded-lg bg-base px-6 py-3 font-medium text-dorado transition-colors hover:bg-dorado hover:text-base disabled:cursor-not-allowed disabled:bg-base/30 disabled:text-claro disabled:hover:bg-base/30 disabled:hover:text-claro"
                        >
                            {sinStock ? "Sin stock" : "Agregar al carrito"}
                        </button>
                        <Link
                            to="/productos"
                            className="rounded-lg border border-base px-6 py-3 text-center font-medium transition-colors hover:bg-base hover:text-claro"
                        >
                            Volver al catálogo
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DetalleProducto;