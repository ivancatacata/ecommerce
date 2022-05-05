import React, { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { setUserIsLogin } from "./store/auth";
import Inicio from "./components/Inicio";
import Carrito from "./components/Carrito";
import { EmailAuthCredential } from "firebase/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Check if exists auth_token on SessionStorage
     **/
    if (
      sessionStorage.getItem(
        "firebase:authUser:AIzaSyDPOkqYHyqQ4di-1BO_prCaoKhSMlzPiRA:[DEFAULT]"
      )
    ) {
      const { displayName, email, photoURL } = JSON.parse(
        sessionStorage.getItem(
          "firebase:authUser:AIzaSyDPOkqYHyqQ4di-1BO_prCaoKhSMlzPiRA:[DEFAULT]"
        )
      );
      dispatch(setUserIsLogin({ nombre: displayName, email, img: photoURL }));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route path="/Carrito" element={<Carrito />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
