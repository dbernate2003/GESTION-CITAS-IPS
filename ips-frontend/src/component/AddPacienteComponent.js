import React, { useEffect, useState } from "react";
import PacienteService from "../service/PacienteService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddPacienteComponent = () => {
  const [cedula, setCedula] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("Valledupar"); // Campo para la ciudad
  const [direccionCompleta, setDireccionCompleta] = useState(""); // Campo para la dirección completa
  const [rol, setRol] = useState("Paciente");

  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdatePaciente = (e) => {
    e.preventDefault();

    // Al guardar, concatenamos la ciudad con la dirección completa
    const paciente = {
      cedula,
      nombreCompleto,
      correo,
      telefono,
      direccion: `${ciudad}, ${direccionCompleta}`, // Concatenamos ciudad y dirección
      rol,
    };

    // Verificación para evitar duplicados
    if (
      cedula === "" ||
      correo === "" ||
      telefono === "" ||
      direccionCompleta === ""
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    if (id) {
      PacienteService.updatePacienteById(id, paciente)
        .then((response) => {
          console.log(response.data);
          navigate("/pacientes");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      PacienteService.createPaciente(paciente)
        .then((response) => {
          console.log(response.data);
          navigate("/pacientes");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      PacienteService.getPacienteById(id)
        .then((response) => {
          const paciente = response.data;
          setCedula(paciente.cedula);
          setNombreCompleto(paciente.nombreCompleto);
          setCorreo(paciente.correo);
          setTelefono(paciente.telefono);

          // Asignamos la ciudad y la dirección completa desde la respuesta
          const [ciudad, ...direccionArr] = paciente.direccion.split(", ");
          setCiudad(ciudad);
          setDireccionCompleta(direccionArr.join(", "));

          setRol(paciente.rol);
        })
        .catch((error) => {
          console.log("Error fetching paciente data", error);
        });
    }
  }, [id]);

  const handleDireccionChange = (e) => {
    if (e.target.name === "ciudad") {
      setCiudad(e.target.value);
    } else {
      setDireccionCompleta(e.target.value);
    }
  };

  const title = () => {
    return (
      <h2 className="text-center">
        {id ? "Actualizar Paciente" : "Agregar Paciente"}
      </h2>
    );
  };

  return (
    <div>
      <div
        className="container"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="row">
          <div className="card col-md-8 offset-md-2">
            {title()}
            <div className="card-body">
              <form>
                <div className="form-group mb-3">
                  <label className="form-label">Cédula</label>
                  <input
                    type="text"
                    placeholder="Digite la cédula"
                    name="cedula"
                    className="form-control"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Nombre Completo</label>
                  <input
                    type="text"
                    placeholder="Digite el nombre completo"
                    name="nombreCompleto"
                    className="form-control"
                    value={nombreCompleto}
                    onChange={(e) => setNombreCompleto(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Digite el correo electrónico"
                    name="correo"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    type="text"
                    placeholder="Digite el teléfono"
                    name="telefono"
                    className="form-control"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                </div>

                {/* Ciudad y Dirección */}
                <div className="form-group mb-3">
                  <label className="form-label">Ciudad</label>
                  <select
                    className="form-select"
                    name="ciudad"
                    value={ciudad}
                    onChange={handleDireccionChange}
                  >
                    <option value="Valledupar">Valledupar</option>
                    <option value="Aguachica">Aguachica</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Dirección Completa</label>
                  <input
                    type="text"
                    name="direccionCompleta"
                    className="form-control"
                    placeholder="Digite la dirección completa"
                    value={direccionCompleta}
                    onChange={handleDireccionChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Rol</label>
                  <select
                    className="form-select"
                    name="rol"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value="Paciente">Paciente</option>
                    <option value="Admin">Administrador</option>
                  </select>
                </div>

                <button
                  className="btn btn-success me-2" // 'me-2' aplica margen a la derecha
                  onClick={saveOrUpdatePaciente}
                >
                  {id ? "Actualizar" : "Guardar"}
                </button>
                <Link to="/pacientes" className="btn btn-danger">
                  Cancelar
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPacienteComponent;
