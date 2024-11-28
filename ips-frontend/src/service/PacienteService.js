import axios from "axios";

// URL base para el API de pacientes
const PACIENTE_BASE_REST_API_URL = "http://localhost:8080/ips/pacientes";

class PacienteService {
  // Método para obtener todos los pacientes
  getAllPacientes() {
    return axios.get(PACIENTE_BASE_REST_API_URL);
  }

  // Método para crear un nuevo paciente
  createPaciente(paciente) {
    return axios.post(PACIENTE_BASE_REST_API_URL, paciente);
  }

  // Método para obtener un paciente por su ID
  getPacienteById(pacienteId) {
    return axios.get(PACIENTE_BASE_REST_API_URL + "/" + pacienteId);
  }

  // Método para actualizar un paciente por su ID
  updatePacienteById(pacienteId, paciente) {
    return axios.put(PACIENTE_BASE_REST_API_URL + "/" + pacienteId, paciente);
  }

  // Método para eliminar un paciente por su ID
  deletePaciente(pacienteId) {
    return axios.delete(PACIENTE_BASE_REST_API_URL + "/" + pacienteId);
  }
}

export default new PacienteService();
