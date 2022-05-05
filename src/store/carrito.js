import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productos: [
    { id: 1, nombre: "Producto 1" },
    { id: 2, nombre: "Producto 2" },
    { id: 3, nombre: "Producto 3" },
    { id: 4, nombre: "Producto 4" },
  ],
  carrito: [],
};

export const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    agregar: (state, action) => {
      const { id, nombre } = action.payload;
      //si el carrito no tiene elementos, le agregamos uno.
      if (state.carrito.length === 0) {
        return { ...state, carrito: [{ id: id, nombre: nombre, cantidad: 1 }] };
      } else {
        // Si ya tiene el producto, actualizamos su valor
        // Si no tiene el producto, lo agregamos.
        // Para poder editar el arreglo tenemos que clonarlo.
        const nuevoCarrito = [...state.carrito];
        // Comprobamos si el carrito ya tiene el ID del producto a agregar.
        const yaEstaEnCarrito =
          nuevoCarrito.filter((productoDeCarrito) => {
            return productoDeCarrito.id === id;
          }).length > 0;
        // Si ya lo tiene, lo actualizamos.
        if (yaEstaEnCarrito) {
          // buscamos su posicion en el arreglo.
          // Y en base a su posicion, actualizamos el valor.
          nuevoCarrito.forEach((productoDeCarrito, index) => {
            if (productoDeCarrito.id === id) {
              const cantidad = nuevoCarrito[index].cantidad;
              nuevoCarrito[index] = {
                id: id,
                nombre: nombre,
                cantidad: cantidad + 1,
              };
            }
          });
          //Si no lo tiene agregamos el producto al arreglo.
        } else {
          nuevoCarrito.push({
            id: id,
            nombre: nombre,
            cantidad: 1,
          });
        }
        return {
          ...state,
          carrito: nuevoCarrito,
        };
      }
    },
    quitar: (state) => {
      if (state.producto1 > 0) state.producto1 -= 1;
    },
  },
});

export const { agregar, quitar } = carritoSlice.actions;
export default carritoSlice.reducer;
