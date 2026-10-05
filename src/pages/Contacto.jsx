// src/pages/Contacto.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import FormularioCompra from "../components/FormularioCompra";

function Contacto({ carrito, vaciarCarrito }) {
    // Guarda una "foto" de la compra confirmada (datos + productos + total).
    // Es necesario porque al confirmar vaciamos el carrito, y después
    // todavía queremos mostrar qué se compró.
    const [compra, setCompra] = useState(null);

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const confirmarCompra = (datos) => {
        setCompra({ datos, items: carrito, total, cantidadTotal });
        vaciarCarrito();
    };

    // Pantalla de confirmación (compra simulada)
    if (compra) {
        return (
            <section className="mx-auto max-w-2xl px-4 py-12">
                <div className="rounded-xl bg-white p-8 shadow-sm">
                    <h1 className="font-titulo text-3xl text-center">
                        ¡Gracias por tu compra, {compra.datos.nombre}!
                    </h1>
                    <p className="mt-2 text-center text-base/70">
                        Te enviamos la confirmación a{" "}
                        <strong>{compra.datos.email}</strong>. Esta es una compra simulada.
                    </p>

                    <ul className="mt-6 divide-y divide-base/10 text-sm">
                        {compra.items.map((item) => (
                            <li key={item.id} className="flex justify-between py-2">
                                <span>
                                    {item.nombre} × {item.cantidad}
                                </span>
                                <span>
                                    ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 flex justify-between border-t border-base/20 pt-4 text-lg font-semibold">
                        <span>Total ({compra.cantidadTotal} productos)</span>
                        <span>${compra.total.toLocaleString("es-AR")}</span>
                    </div>

                    <p className="mt-4 text-sm text-base/70">
                        Entrega:{" "}
                        {compra.datos.entrega === "domicilio"
                            ? "Envío a domicilio"
                            : "Retiro en sucursal"}{" "}
                        · {compra.datos.direccion}
                    </p>

                    <Link
                        to="/productos"
                        className="mt-8 block rounded-lg bg-base px-6 py-3 text-center font-medium text-dorado transition-colors hover:bg-dorado hover:text-base"
                    >
                        Seguir comprando
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="font-titulo text-3xl">Finalizar compra</h1>
            <p className="mt-1 text-base/70">
                Completá tus datos para confirmar el pedido.
            </p>

            <div className="mt-6 grid gap-8 lg:grid-cols-3">
                <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
                    <FormularioCompra
                        carritoVacio={carrito.length === 0}
                        onConfirmar={confirmarCompra}
                    />
                </div>

                {/* Resumen del pedido */}
                <aside className="h-fit rounded-xl bg-base p-6 text-claro shadow-sm">
                    <h2 className="font-titulo text-xl text-dorado">Tu pedido</h2>

                    {carrito.length === 0 ? (
                        <p className="mt-4 text-sm">No hay productos en el carrito.</p>
                    ) : (
                        <>
                            <ul className="mt-4 space-y-2 text-sm">
                                {carrito.map((item) => (
                                    <li key={item.id} className="flex justify-between">
                                        <span>
                                            {item.nombre} × {item.cantidad}
                                        </span>
                                        <span>
                                            ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 flex justify-between border-t border-claro/20 pt-3 font-semibold">
                                <span>Total</span>
                                <span className="text-dorado">
                                    ${total.toLocaleString("es-AR")}
                                </span>
                            </div>
                        </>
                    )}

                    <Link
                        to="/carrito"
                        className="mt-4 block text-center text-sm underline opacity-80 hover:opacity-100"
                    >
                        Volver al carrito
                    </Link>
                </aside>
            </div>
        </section>
    );
}

export default Contacto;