import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregar, quitar } from "../store/carrito";

const Productos = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.carrito.productos);
  return (
    <div>
      <h3>Productos</h3>
      <div>
        {productos.map((producto, index) => {
          return (
            <div key={index}>
              <p>{producto.nombre}</p>
              <button
                onClick={() => {
                  dispatch(agregar(producto));
                }}
              >
                Agregar al carrito
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Productos;
