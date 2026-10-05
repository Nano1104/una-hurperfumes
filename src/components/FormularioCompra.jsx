// src/components/FormularioCompra.jsx
import { useState } from "react";

const estadoInicial = {
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    entrega: "domicilio",
    mensaje: "",
};

// Devuelve un objeto con los errores encontrados. Si está vacío, el formulario es válido.
function validar(datos) {
    const errores = {};

    if (!datos.nombre.trim()) {
        errores.nombre = "Ingresá tu nombre y apellido.";
    }

    if (!datos.email.trim()) {
        errores.email = "Ingresá tu email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
        errores.email = "El email no tiene un formato válido.";
    }

    if (!datos.telefono.trim()) {
        errores.telefono = "Ingresá tu teléfono.";
    } else if (!/^[0-9+\s-]{8,}$/.test(datos.telefono)) {
        errores.telefono = "El teléfono debe tener al menos 8 dígitos.";
    }

    if (!datos.direccion.trim()) {
        errores.direccion = "Ingresá tu dirección o localidad.";
    }

    return errores;
}

// Pequeño componente para no repetir label + input + error en cada campo
function Campo({ id, label, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium">
                {label}
            </label>
            {children}
            {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
        </div>
    );
}

function FormularioCompra({ carritoVacio, onConfirmar }) {
    const [datos, setDatos] = useState(estadoInicial);
    const [errores, setErrores] = useState({});

    // Un solo handler para todos los campos: usa el "name" del input como clave
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos((prev) => ({ ...prev, [name]: value }));
        // Al corregir un campo, se limpia su error
        setErrores((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (carritoVacio) return;

        const erroresEncontrados = validar(datos);
        setErrores(erroresEncontrados);

        if (Object.keys(erroresEncontrados).length === 0) {
            onConfirmar(datos);
            setDatos(estadoInicial);
        }
    };

    const input = (campo) =>
        `w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dorado/40 ${errores[campo]
            ? "border-red-600"
            : "border-base/20 focus:border-dorado"
        }`;

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Campo id="nombre" label="Nombre y apellido" error={errores.nombre}>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={datos.nombre}
                    onChange={handleChange}
                    className={input("nombre")}
                />
            </Campo>

            <div className="grid gap-4 sm:grid-cols-2">
                <Campo id="email" label="Email" error={errores.email}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={datos.email}
                        onChange={handleChange}
                        className={input("email")}
                    />
                </Campo>

                <Campo id="telefono" label="Teléfono" error={errores.telefono}>
                    <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={datos.telefono}
                        onChange={handleChange}
                        className={input("telefono")}
                    />
                </Campo>
            </div>

            <Campo
                id="direccion"
                label="Dirección o localidad"
                error={errores.direccion}
            >
                <input
                    id="direccion"
                    name="direccion"
                    type="text"
                    value={datos.direccion}
                    onChange={handleChange}
                    className={input("direccion")}
                />
            </Campo>

            <Campo id="entrega" label="Método de entrega">
                <select
                    id="entrega"
                    name="entrega"
                    value={datos.entrega}
                    onChange={handleChange}
                    className={input("entrega")}
                >
                    <option value="domicilio">Envío a domicilio</option>
                    <option value="sucursal">Retiro en sucursal</option>
                </select>
            </Campo>

            <Campo id="mensaje" label="Mensaje o aclaración (opcional)">
                <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={3}
                    value={datos.mensaje}
                    onChange={handleChange}
                    className={input("mensaje")}
                />
            </Campo>

            {carritoVacio && (
                <p className="rounded-lg bg-dorado/20 px-3 py-2 text-sm">
                    Tu carrito está vacío. Agregá productos para poder confirmar la compra.
                </p>
            )}

            <button
                type="submit"
                disabled={carritoVacio}
                className="w-full rounded-lg bg-base px-6 py-3 font-medium text-dorado transition-colors hover:bg-dorado hover:text-base disabled:cursor-not-allowed disabled:bg-base/30 disabled:text-claro disabled:hover:bg-base/30 disabled:hover:text-claro"
            >
                Confirmar compra
            </button>
        </form>
    );
}

export default FormularioCompra;