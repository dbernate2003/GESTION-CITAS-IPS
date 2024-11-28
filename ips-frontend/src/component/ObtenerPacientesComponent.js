import React, { useEffect, useState } from "react";
import PacienteService from "../service/PacienteService";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs"; // Importa el ícono de búsqueda

const ObtenerPacientesComponent = () => {
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [searchCedula, setSearchCedula] = useState("");

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

  const deletePaciente = (id) => {
    PacienteService.deletePaciente(id)
      .then(() => {
        obtenerPacientes(); // Vuelve a obtener la lista de pacientes actualizada
      })
      .catch((error) => {
        console.error("Error eliminando paciente:", error);
      });
  };

  return (
    <div className="container">
      {/* Espacio arriba del título */}
      <h2 className="text-center mt-5 mb-4">Lista de Pacientes</h2>
      <div className="d-flex justify-content-between mb-4">
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

        {/* Botón para agregar paciente */}
        <Link to="/add-paciente" className="btn btn-primary">
          Agregar Paciente
        </Link>
      </div>

      {/* Espacio arriba de la tabla */}
      <table className="table table-bordered table-striped mt-4">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPacientes.map((paciente) => (
            <tr key={paciente.cedula}>
              <td>{paciente.cedula}</td>
              <td>{paciente.nombreCompleto}</td>
              <td>{paciente.correo}</td>
              <td>{paciente.telefono}</td>
              <td>{paciente.direccion}</td>
              <td>{paciente.rol}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    to={`/edit-paciente/${paciente.cedula}`}
                    className="btn btn-info"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deletePaciente(paciente.cedula)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ObtenerPacientesComponent;
