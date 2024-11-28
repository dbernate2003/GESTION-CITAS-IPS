import "./App.css";
import ObtenerPacientesComponent from "./component/ObtenerPacientesComponent";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AddPacienteComponent from "./component/AddPacienteComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ObtenerPacientesCitasComponent from "./component/ObtenerPacientesCitasComponent";
import AddCitaComponent from "./component/addCitaComponent";
import ObtenerCitasComponent from "./component/ObtenerCitasComponent";
import UpdateCitaComponent from "./component/UpdateCitaComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ObtenerPacientesComponent />} />
            <Route path="/pacientes" element={<ObtenerPacientesComponent />} />
            <Route path="/citas" element={<ObtenerCitasComponent />} />
            <Route path="/add-paciente" element={<AddPacienteComponent />} />
            <Route
              path="/add-cita-paciente"
              element={<ObtenerPacientesCitasComponent />}
            />
            <Route path="/add-cita/:id" element={<AddCitaComponent />} />
            <Route path="/edit-cita/:id" element={<UpdateCitaComponent />} />
            <Route
              path="/edit-paciente/:id"
              element={<AddPacienteComponent />}
            />
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
