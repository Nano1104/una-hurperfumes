// src/pages/Carrito.jsx
import { Link } from "react-router-dom";
import CarritoItem from "../components/CarritoItem";

function Carrito({
    carrito,
    total,
    cantidadTotal,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
}) {
    // Carrito vacío: mensaje y camino de vuelta al catálogo
    if (carrito.length === 0) {
        return (
            <section className="mx-auto max-w-3xl px-4 py-16 text-center">
                <h1 className="font-titulo text-3xl">Tu carrito está vacío</h1>
                <p className="mt-2 text-base/70">
                    Todavía no agregaste ningún perfume.
                </p>
                <Link
                    to="/productos"
                    className="mt-6 inline-block rounded-lg bg-base px-6 py-3 text-dorado transition-colors hover:bg-dorado hover:text-base"
                >
                    Ver productos
                </Link>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="font-titulo text-3xl">Tu carrito</h1>

            <div className="mt-6 grid gap-8 lg:grid-cols-3">
                {/* Lista de productos */}
                <ul className="space-y-4 lg:col-span-2">
                    {carrito.map((item) => (
                        <CarritoItem
                            key={item.id}
                            item={item}
                            cambiarCantidad={cambiarCantidad}
                            eliminarDelCarrito={eliminarDelCarrito}
                        />
                    ))}
                </ul>

                {/* Resumen */}
                <aside className="h-fit rounded-xl bg-base p-6 text-claro shadow-sm lg:sticky lg:top-24">
                    <h2 className="font-titulo text-xl text-dorado">Resumen</h2>

                    <dl className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <dt>Cantidad de productos</dt>
                            <dd>{cantidadTotal}</dd>
                        </div>
                        <div className="flex justify-between border-t border-claro/20 pt-3 text-lg font-semibold">
                            <dt>Total</dt>
                            <dd className="text-dorado">
                                ${total.toLocaleString("es-AR")}
                            </dd>
                        </div>
                    </dl>

                    <Link
                        to="/contacto"
                        className="mt-6 block rounded-lg bg-dorado px-4 py-3 text-center font-semibold text-base transition-colors hover:bg-claro"
                    >
                        Finalizar compra
                    </Link>
                    <button
                        type="button"
                        onClick={vaciarCarrito}
                        className="mt-3 w-full text-sm underline opacity-80 hover:opacity-100"
                    >
                        Vaciar carrito
                    </button>
                </aside>
            </div>
        </section>
    );
}

export default Carrito;