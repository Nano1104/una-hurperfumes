// src/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";

function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);

      if (existente) {
        // No dejamos superar el stock disponible
        if (existente.cantidad >= producto.stock) return prev;
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // delta = +1 para aumentar, -1 para disminuir
  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nueva = item.cantidad + delta;
        if (nueva < 1 || nueva > item.stock) return item;
        return { ...item, cantidad: nueva };
      })
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  // Valores derivados: se calculan en cada render, no hace falta otro useState
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="flex min-h-screen flex-col bg-claro text-base">
      <NavBar cantidadTotal={cantidadTotal} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home agregarAlCarrito={agregarAlCarrito} />} />
          <Route
            path="/productos"
            element={<Productos agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/producto/:id"
            element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />}
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                total={total}
                cantidadTotal={cantidadTotal}
                cambiarCantidad={cambiarCantidad}
                eliminarDelCarrito={eliminarDelCarrito}
                vaciarCarrito={vaciarCarrito}
              />
            }
          />
          <Route
            path="/contacto"
            element={<Contacto carrito={carrito} vaciarCarrito={vaciarCarrito} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;