// src/pages/Productos.jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productos, categorias } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

function Productos({ agregarAlCarrito }) {
    // Si venimos del inicio con /productos?categoria=Mujer, arrancamos con ese filtro
    const [searchParams] = useSearchParams();
    const categoriaUrl = searchParams.get("categoria");
    const categoriaInicial = categorias.includes(categoriaUrl) ? categoriaUrl : "Todas";

    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState(categoriaInicial);
    const [orden, setOrden] = useState("ninguno");
    const [soloConStock, setSoloConStock] = useState(false);

    // 1) Filtros: filter() devuelve un array nuevo, por eso después
    //    podemos usar sort() sin modificar el array original de productos
    const productosFiltrados = productos
        .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
        .filter((p) => categoria === "Todas" || p.categoria === categoria)
        .filter((p) => !soloConStock || p.stock > 0);

    // 2) Orden por precio
    if (orden === "menor") productosFiltrados.sort((a, b) => a.precio - b.precio);
    if (orden === "mayor") productosFiltrados.sort((a, b) => b.precio - a.precio);

    const limpiarFiltros = () => {
        setBusqueda("");
        setCategoria("Todas");
        setOrden("ninguno");
        setSoloConStock(false);
    };

    const campo =
        "w-full rounded-lg border border-base/20 bg-white px-3 py-2 text-sm focus:border-dorado focus:outline-none focus:ring-2 focus:ring-dorado/40";

    return (
        <section className="mx-auto max-w-6xl px-4 py-10">
            <h1 className="font-titulo text-3xl">Nuestros perfumes</h1>
            <p className="mt-1 text-base/70">
                Encontrá la fragancia que mejor va con vos.
            </p>

            {/* Barra de filtros */}
            <div className="mt-6 grid gap-3 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
                <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre..."
                    aria-label="Buscar por nombre"
                    className={campo}
                />

                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    aria-label="Filtrar por categoría"
                    className={campo}
                >
                    <option value="Todas">Todas las categorías</option>
                    {categorias.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <select
                    value={orden}
                    onChange={(e) => setOrden(e.target.value)}
                    aria-label="Ordenar por precio"
                    className={campo}
                >
                    <option value="ninguno">Ordenar por...</option>
                    <option value="menor">Precio: menor a mayor</option>
                    <option value="mayor">Precio: mayor a menor</option>
                </select>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={soloConStock}
                        onChange={(e) => setSoloConStock(e.target.checked)}
                        className="h-4 w-4 accent-base"
                    />
                    Solo con stock
                </label>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-base/70">
                <span>
                    {productosFiltrados.length}{" "}
                    {productosFiltrados.length === 1 ? "producto" : "productos"}
                </span>
                <button
                    type="button"
                    onClick={limpiarFiltros}
                    className="underline hover:text-base"
                >
                    Limpiar filtros
                </button>
            </div>

            {/* Grilla de productos */}
            {productosFiltrados.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {productosFiltrados.map((producto) => (
                        <ProductoCard
                            key={producto.id}
                            producto={producto}
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    ))}
                </div>
            ) : (
                <p className="mt-12 text-center text-base/70">
                    No encontramos perfumes con esos filtros.
                </p>
            )}
        </section>
    );
}

export default Productos;