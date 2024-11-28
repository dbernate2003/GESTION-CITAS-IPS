import React, { useEffect, useState } from "react";
import PacienteService from "../service/PacienteService";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs"; // Si deseas usar un ícono de búsqueda

const ObtenerPacientesCitasComponent = () => {
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [searchCedula, setSearchCedula] = useState(""); // Estado para la búsqueda por cédula

  const obtenerPacientes = () => {
    PacienteService.getAllPacientes()
      .then((response) => {
        setPacientes(response.data);
        setFilteredPacientes(response.data); // Inicialmente, mostramos todos los pacientes
        console.log("Pacientes obtenidos:", response.data);
      })
      .catch((error) => {
        console.error("Error obteniendo pacientes:", error);
      });
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  const handleSearchChange = (e) => {
    const cedula = e.target.value;
    setSearchCedula(cedula);

    // Filtrar los pacientes por cédula
    const filtered = pacientes.filter((paciente) =>
      paciente.cedula.toLowerCase().includes(cedula.toLowerCase())
    );
    setFilteredPacientes(filtered);
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-4">Seleccionar paciente</h2>

      {/* Contenedor para alinear el campo de búsqueda */}
      <div
        className="d-flex justify-content-between mb-4"
        style={{ gap: "15px" }}
      >
        {/* Campo de búsqueda por cédula */}
        <div className="position-relative w-50">
          <input
            type="text"
            placeholder="Buscar por cédula"
            className="form-control pr-5"
            value={searchCedula}
            onChange={handleSearchChange}
          />
          <span
            className="position-absolute"
            style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
          >
            <BsSearch />
          </span>
        </div>
      </div>

      {/* Tabla de pacientes filtrados */}
      <table className="table table-bordered table-striped mt-4">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th className="text-center">Acciones</th>{" "}
            {/* Columna para las acciones */}
          </tr>
        </thead>
        <tbody>
          {filteredPacientes.map((paciente) => (
            <tr key={paciente.cedula}>
              <td>{paciente.cedula}</td>
              <td>{paciente.nombreCompleto}</td>
              <td>{paciente.telefono}</td>
              <td>
                <div
                  className="d-flex justify-content-center"
                  style={{ display: "flex", gap: "10px" }}
                >
                  {/* Botón para agregar cita */}
                  <Link
                    to={`/add-cita/${paciente.cedula}`}
                    className="btn btn-primary"
                  >
                    Agregar Cita
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ObtenerPacientesCitasComponent;
