import React, { useEffect, useState } from "react";
import CitaService from "../service/CitaService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UpdateCitaComponent = () => {
  const [fechaHora, setFechaHora] = useState("");
  const [estado, setEstado] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    CitaService.getCitaById(id)
      .then((response) => {
        const cita = response.data;
        setFechaHora(cita.fechaHora);
        setEstado(cita.estado);
      })
      .catch((error) => {
        console.log("Error metodo get para cita con el id: " + id, error);
      });
  }, [id]);

  const updateCita = (e) => {
    e.preventDefault();
    const cita = {
      fechaHora,
      estado,
    };
    CitaService.updateCitaById(id, cita).then((response) => {
      console.log(response.data);
      navigate("/citas");
    });
  };

  const title = () => {
    return <h2>Actualizar cita</h2>;
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
              onClick={updateCita} // Llamamos a la función handleSubmit
            >
              Actualizar
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
export default UpdateCitaComponent;
