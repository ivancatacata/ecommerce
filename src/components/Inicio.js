import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import Productos from "./Productos";

const Inicio = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <NavBar />
        </Col>
      </Row>
      <Row>
        <Productos />
      </Row>
    </Container>
  );
};

export default Inicio;
