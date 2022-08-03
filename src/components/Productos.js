import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { agregar, quitar } from "../store/carrito";

const Productos = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.carrito.productos);
  const carrito = useSelector((state) => state.carrito.carrito);

  return (
    <div>
      <h3>Productos</h3>

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
            <button
              disabled={
                carrito.find((product) => product.id === producto.id)
                  ? false
                  : true
              }
              onClick={() => dispatch(quitar(producto))}
            >
              Quitar del Carrito
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Productos;
