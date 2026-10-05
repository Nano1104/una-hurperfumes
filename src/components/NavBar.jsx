// src/components/NavBar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const enlaces = [
    { to: "/", label: "Inicio" },
    { to: "/productos", label: "Productos" },
    { to: "/contacto", label: "Contacto" },
    { to: "/carrito", label: "Carrito" },
];

function NavBar({ cantidadTotal }) {
    const [abierto, setAbierto] = useState(false);

    // NavLink recibe isActive y permite resaltar la ruta actual
    const claseEnlace = ({ isActive }) =>
        `block px-3 py-2 text-sm uppercase tracking-widest transition-colors hover:text-dorado ${isActive ? "text-dorado" : "text-claro"
        }`;

    return (
        <header className="sticky top-0 z-50 bg-base border-b border-dorado/30">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link
                    to="/"
                    onClick={() => setAbierto(false)}
                    className="font-titulo text-2xl text-dorado"
                >
                    Una Hurparfum
                </Link>

                {/* Botón hamburguesa: solo visible en celular */}
                <button
                    type="button"
                    onClick={() => setAbierto(!abierto)}
                    aria-label="Abrir menú"
                    aria-expanded={abierto}
                    className="text-claro text-2xl md:hidden"
                >
                    {abierto ? "✕" : "☰"}
                </button>

                {/* En escritorio siempre visible; en celular depende de "abierto" */}
                <ul
                    className={`${abierto ? "flex" : "hidden"
                        } absolute left-0 top-full w-full flex-col bg-base px-4 pb-4 md:static md:flex md:w-auto md:flex-row md:gap-2 md:p-0`}
                >
                    {enlaces.map((enlace) => (
                        <li key={enlace.to}>
                            <NavLink
                                to={enlace.to}
                                end={enlace.to === "/"}
                                onClick={() => setAbierto(false)}
                                className={claseEnlace}
                            >
                                {enlace.label}
                                {enlace.to === "/carrito" && cantidadTotal > 0 && (
                                    <span className="ml-2 rounded-full bg-dorado px-2 py-0.5 text-xs font-bold text-base">
                                        {cantidadTotal}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;