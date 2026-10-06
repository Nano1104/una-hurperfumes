// src/components/CarritoItem.jsx
import { Link } from "react-router-dom";

function CarritoItem({ item, cambiarCantidad, eliminarDelCarrito }) {
    const { id, nombre, imagen, precio, cantidad, stock } = item;
    const subtotal = precio * cantidad;

    const botonCantidad =
        "flex h-8 w-8 items-center justify-center rounded-lg border border-base/30 text-lg transition-colors hover:bg-base hover:text-claro disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-base";

    return (
        <li className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
            <img
                src={imagen}
                alt={nombre}
                className="h-24 w-24 shrink-0 rounded-lg bg-white object-contain p-1"
            />

            <div className="flex-1">
                <Link
                    to={`/producto/${id}`}
                    className="font-titulo text-lg hover:text-base/70"
                >
                    {nombre}
                </Link>
                <p className="text-sm text-base/60">
                    ${precio.toLocaleString("es-AR")} por unidad
                </p>
            </div>

            {/* Controles de cantidad */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => cambiarCantidad(id, -1)}
                    disabled={cantidad <= 1}
                    aria-label={`Disminuir cantidad de ${nombre}`}
                    className={botonCantidad}
                >
                    −
                </button>
                <span className="w-6 text-center font-medium">{cantidad}</span>
                <button
                    type="button"
                    onClick={() => cambiarCantidad(id, 1)}
                    disabled={cantidad >= stock}
                    aria-label={`Aumentar cantidad de ${nombre}`}
                    className={botonCantidad}
                >
                    +
                </button>
            </div>

            {/* Subtotal = precio por unidad × cantidad */}
            <p className="w-28 font-semibold sm:text-right">
                ${subtotal.toLocaleString("es-AR")}
            </p>

            <button
                type="button"
                onClick={() => eliminarDelCarrito(id)}
                className="text-sm text-red-700 underline hover:text-red-900"
            >
                Eliminar
            </button>
        </li>
    );
}

export default CarritoItem;