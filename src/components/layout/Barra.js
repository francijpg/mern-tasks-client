import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext";
import { useHistory } from "react-router-dom";

const Barra = () => {
  // Extraer la información de autenticación
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  const history = useHistory();

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre} </span>{" "}
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          data-cy="cerrar-sesion"
          className="btn btn-blank cerrar-sesion"
          onClick={() => {
            cerrarSesion();
            history.push("/");
          }}
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default Barra;
