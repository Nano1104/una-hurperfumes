// src/components/ProductoCard.jsx
import { Link } from "react-router-dom";

function ProductoCard({ producto, agregarAlCarrito }) {
    const { id, nombre, categoria, precio, imagen, descripcion, stock, etiqueta } =
        producto;
    const sinStock = stock === 0;

    return (
        <article className="flex flex-col overflow-hidden rounded-xl border border-base/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
            <div className="relative">
                <img
                    src={imagen}
                    alt={nombre}
                    className={`aspect-square w-full object-cover ${sinStock ? "opacity-50 grayscale" : ""
                        }`}
                />

                {/* Etiqueta: "Sin stock" tiene prioridad sobre Nuevo / Oferta / Más vendido */}
                {sinStock ? (
                    <span className="absolute left-3 top-3 rounded bg-base px-2 py-1 text-xs font-semibold uppercase tracking-wide text-claro">
                        Sin stock
                    </span>
                ) : (
                    etiqueta && (
                        <span className="absolute left-3 top-3 rounded bg-dorado px-2 py-1 text-xs font-semibold uppercase tracking-wide text-base">
                            {etiqueta}
                        </span>
                    )
                )}
            </div>

            <div className="flex flex-1 flex-col p-4">
                <span className="text-xs uppercase tracking-widest text-base/60">
                    {categoria}
                </span>
                <h3 className="mt-1 font-titulo text-xl">{nombre}</h3>
                <p className="mt-2 flex-1 text-sm text-base/70">{descripcion}</p>

                <div className="mt-4 flex items-end justify-between">
                    <span className="text-lg font-semibold">
                        ${precio.toLocaleString("es-AR")}
                    </span>
                    <span
                        className={`text-xs ${sinStock ? "text-red-700" : "text-base/60"}`}
                    >
                        {sinStock ? "No disponible" : `Stock: ${stock}`}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                        to={`/producto/${id}`}
                        className="rounded-lg border border-base px-3 py-2 text-center text-sm font-medium transition-colors hover:bg-base hover:text-claro"
                    >
                        Ver detalle
                    </Link>
                    <button
                        type="button"
                        onClick={() => agregarAlCarrito(producto)}
                        disabled={sinStock}
                        className="rounded-lg bg-base px-3 py-2 text-sm font-medium text-dorado transition-colors hover:bg-dorado hover:text-base disabled:cursor-not-allowed disabled:bg-base/30 disabled:text-claro disabled:hover:bg-base/30 disabled:hover:text-claro"
                    >
                        Agregar
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductoCard;