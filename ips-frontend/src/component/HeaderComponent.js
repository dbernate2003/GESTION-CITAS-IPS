// HeaderComponent.js
import React from "react";
import { Link } from "react-router-dom";

export const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav
          className="navbar navbar-expand-md navbar-dark"
          style={{ backgroundColor: "#797979" }}
        >
          <ul className="nav nav-tabs justify-content-center w-100">
            {/* Botón desplegable de Citas */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                Citas
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/add-cita-paciente">
                    Agregar
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/citas">
                    Buscar
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                Pacientes
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/add-paciente">
                    Agregar
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Buscar
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link disabled text-white" to="#">
                Disabled
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
