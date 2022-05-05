import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";

const Carrito = () => {
  const carrito = useSelector((state) => state.carrito.carrito);

  const comprar = (e) => {
    e.preventDefault();
    const carritoObj = Object.assign({}, carrito);
    addDoc(collection(db, "pedidos"), carritoObj);
  };
  return (
    <Container fluid>
      <NavBar />
      <h3>Carrito de compra xd</h3>
      {carrito.length > 0 ? (
        carrito.map((producto, index) => {
          return (
            <Producto key={index}>
              <NombreProducto>{producto.nombre}</NombreProducto>
              Cantidad: {producto.cantidad}
            </Producto>
          );
        })
      ) : (
        <p>NO HAY NADA TETON</p>
      )}
      <button onClick={comprar}>Comprar</button>
    </Container>
  );
};
const Producto = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ebebf3;
  font-size: 14px;
`;

const NombreProducto = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: #000;
`;

export default Carrito;
