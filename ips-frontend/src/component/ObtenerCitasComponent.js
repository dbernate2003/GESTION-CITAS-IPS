import React, { useState, useEffect } from "react";
import CitaService from "../service/CitaService";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const ObtenerCitasComponent = () => {
  const [citas, setCitas] = useState([]);
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [searchCedula, setSearchCedula] = useState("");

  const ObtenerCitas = () => {
    CitaService.getAllCitas().then((response) => {
      setCitas(response.data);
      setFilteredCitas(response.data);
      console.log("Citas obtenidas:", response.data);
    });
  };

  const deletePaciente = () => {
    return "ok";
  };

  useEffect(() => {
    ObtenerCitas();
  }, []);

  const handleSearchChange = (e) => {
    const cedula = e.target.value;
    setSearchCedula(cedula);

    // Filtrar las citas por cédula
    const filtered = citas.filter((cita) =>
      cita.pacienteCedula.toLowerCase().includes(cedula.toLowerCase())
    );
    setFilteredCitas(filtered);
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-4">Lista de Citas</h2>

      {/* Fila con el campo de búsqueda a la izquierda y botón a la derecha */}
      <div className="d-flex justify-content-between mb-4">
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
        <Link to="/add-cita" className="btn btn-primary">
          Agregar una Cita
        </Link>
      </div>

      {/* Tabla con scroll */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-4">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Estado</th>
              <th>Fecha y Hora</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCitas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.id}</td>
                <td>{cita.estado}</td>
                <td>{new Date(cita.fechaHora).toLocaleString()}</td>
                <td>
                  <div
                    className="d-flex justify-content-center"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <Link to={`/edit-cita/${cita.id}`} className="btn btn-info">
                      Editar
                    </Link>
                    <button onClick={deletePaciente} className="btn btn-danger">
                      Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ObtenerCitasComponent;
