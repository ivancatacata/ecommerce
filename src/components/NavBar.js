import React from "react";
import { NavLink } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  signOut,
  setPersistence,
  GoogleAuthProvider,
  browserSessionPersistence,
} from "firebase/auth";
import { Container, Navbar, NavDropdown, Nav, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUserIsLogin, setUserUnLog } from "../store/auth";

const NavBar = () => {
  // REDUX STORE
  const dispatch = useDispatch();
  const { isLogin, user } = useSelector((state) => state.auth);

  const auth = getAuth();

  const provider = new GoogleAuthProvider();
  const loguear = () => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(auth, provider).then((result) => {
          const { displayName, email, photoURL } = result.user;
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.idToken;
          console.log(token, credential);
          dispatch(
            setUserIsLogin({ nombre: displayName, email, img: photoURL })
          );
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const desloguear = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(setUserUnLog());
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <Row>
      <Navbar bg="primary" expand="lg">
        <Container>
          <NavLink to="/" className="text-decoration-none text-white fs-2">
            Carteras Lucía
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-4">
              <NavLink to="/" className="text-decoration-none text-white fs-4">
                inicio
              </NavLink>
              <NavLink
                to="/Carrito"
                className="text-decoration-none text-white fs-4"
              >
                Carrito
              </NavLink>
              <NavDropdown title="Iniciar Sesion" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Divider />
                {isLogin ? (
                  <NavDropdown.Item onClick={desloguear}>
                    Cerrar Sesion
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item onClick={loguear}>
                    Iniciar Sesion
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
};

export default NavBar;
