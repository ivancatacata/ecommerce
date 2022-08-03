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
import {
  Container,
  Navbar,
  NavDropdown,
  Button,
  OverlayTrigger,
  Popover,
  Nav,
  Row,
} from "react-bootstrap";
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
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={
                  <Popover id={`popover-positioned-bottom`}>
                    {isLogin && (
                      <Popover.Header as="h3">
                        Hola {user.nombre}!
                      </Popover.Header>
                    )}
                    <Popover.Body>
                      {isLogin ? (
                        <>
                          <Button variant="text">Mis pedidos</Button>
                          <Button variant="text" onClick={desloguear}>
                            Cerrar Sesion
                          </Button>
                        </>
                      ) : (
                        <Button variant="text" onClick={loguear}>
                          Iniciar Sesion con gmail
                        </Button>
                      )}
                    </Popover.Body>
                  </Popover>
                }
              >
                <Button
                  variant="text"
                  className="fs-4 p-0 text-start text-light"
                >
                  {isLogin ? (
                    <>
                      {user.nombre}
                      <img
                        src={user.img}
                        alt="profile"
                        className="rounded-circle ms-2 w-25"
                      />
                    </>
                  ) : (
                    "Iniciar Sesion"
                  )}
                </Button>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
};

export default NavBar;
