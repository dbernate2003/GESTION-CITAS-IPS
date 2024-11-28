import axios from "axios";

// URL base para el API de citas
const CITA_BASE_REST_API_URL = "http://localhost:8080/ips/citas";

class CitaService {
  // Método para obtener todas las citas
  getAllCitas() {
    return axios.get(CITA_BASE_REST_API_URL);
  }

  // Método para obtener una cita por su ID
  getCitaById(citaId) {
    return axios.get(`${CITA_BASE_REST_API_URL}/${citaId}`);
  }

  // Método para crear una nueva cita para un paciente específico
  createCita(cedulaPaciente, cita) {
    return axios.post(`${CITA_BASE_REST_API_URL}/${cedulaPaciente}`, cita);
  }

  // Método para actualizar una cita por su ID
  updateCitaById(citaId, cita) {
    return axios.put(`${CITA_BASE_REST_API_URL}/${citaId}`, cita);
  }

  // Método para eliminar una cita por su ID
  deleteCita(citaId) {
    return axios.delete(`${CITA_BASE_REST_API_URL}/${citaId}`);
  }
}

export default new CitaService();
