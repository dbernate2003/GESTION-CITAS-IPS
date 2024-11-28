import React, { useState, useEffect } from "react";
import CitaService from "../service/CitaService";
import { useParams, useNavigate, Link } from "react-router-dom";

export const AddCitaComponent = ({ pacienteId, onCitaAgregada }) => {
  const [fechaHora, setFechaHora] = useState("");
  const [estado, setEstado] = useState("");
  const { id } = useParams();
  const cedulaPaciente = id;

  const saveCita = (e) => {
    e.preventDefault();

    const cita = {
      fechaHora,
      estado,
    };

    if (fechaHora === "" || estado === "") {
      alert("Por favor, complete todos los campos.");
      return;
    }
    CitaService.createCita(cedulaPaciente, cita)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) {
      CitaService.getCitaById(id)
        .then((response) => {
          const cita = response.data;
          // Asegurarse de que la fechaHora esté en el formato adecuado
          const formattedFechaHora = cita.fechaHora.replace(" ", "T");
          setFechaHora(formattedFechaHora);
          setEstado(cita.estado || "");
        })
        .catch((error) => {
          console.log("Error fetching cita data", error);
        });
    }
  }, [id]);

  const title = () => {
    // Cambiar el título dependiendo del estado
    return <h2 className="text-center">Agregar cita</h2>;
  };

  const buttonText = () => {
    // Cambiar el texto del botón dependiendo del estado
    return "Agregar Cita";
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header text-center">{title()}</div>
        <div className="card-body">
          <form>
            <div className="form-group my-3">
              <label htmlFor="fechaHora" className="form-label">
                Fecha y Hora
              </label>
              <input
                type="datetime-local"
                id="fechaHora"
                className="form-control"
                value={fechaHora}
                onChange={(e) => setFechaHora(e.target.value)}
                required
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="estado" className="form-label">
                Estado
              </label>
              <select
                id="estado"
                className="form-select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              >
                <option value="">Seleccione un estado</option>
                <option value="Programada">Programada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
            <button
              className="btn btn-success me-2"
              onClick={saveCita} // Llamamos a la función handleSubmit
            >
              {buttonText()}
            </button>
            <Link to="/citas" className="btn btn-danger">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCitaComponent;
