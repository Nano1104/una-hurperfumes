// src/components/Footer.jsx
import { Link } from "react-router-dom";

const enlaces = [
    { to: "/", label: "Inicio" },
    { to: "/productos", label: "Productos" },
    { to: "/contacto", label: "Contacto" },
    { to: "/carrito", label: "Carrito" },
];

function Footer() {
    // El año se calcula solo, así no hay que actualizarlo a mano
    const anio = new Date().getFullYear();

    return (
        <footer className="border-t border-dorado/30 bg-base text-claro">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
                <div>
                    <Link to="/" className="font-titulo text-2xl text-dorado">
                        Una Hurparfum
                    </Link>
                    <p className="mt-2 max-w-sm text-sm text-claro/70">
                        Perfumería árabe y de nicho. Fragancias originales con carácter.
                    </p>
                </div>

                <ul className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
                    {enlaces.map((enlace) => (
                        <li key={enlace.to}>
                            <Link
                                to={enlace.to}
                                className="text-sm uppercase tracking-widest transition-colors hover:text-dorado"
                            >
                                {enlace.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="border-t border-claro/10 px-4 py-4 text-center text-xs text-claro/50">
                © {anio} Una Hurparfum · Trabajo práctico de Construcción de Interfaces
            </p>
        </footer>
    );
}

export default Footer;
