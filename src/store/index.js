import { configureStore } from "@reduxjs/toolkit";
import carritoReducer from "./carrito";
import authReducer from "./auth";
export const store = configureStore({
  reducer: {
    carrito: carritoReducer,
    auth: authReducer,
  },
});
