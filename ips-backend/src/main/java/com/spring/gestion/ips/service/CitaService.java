package com.spring.gestion.ips.service;

import com.spring.gestion.ips.entity.Cita;
import com.spring.gestion.ips.entity.CitaDTO;
import com.spring.gestion.ips.entity.Paciente;
import com.spring.gestion.ips.exeption.ResourceNotFoundException;
import com.spring.gestion.ips.repository.CitaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;
    @Autowired
    private PacienteService pacienteService;

       public List<CitaDTO> obtenerCitasDTO() {
        // Obtén las citas con los pacientes cargados usando el método del repositorio
        return citaRepository.obtenerCitasConPacientes().stream()
                // Convierte cada Cita en un CitaDTO
                .map(cita -> new CitaDTO(
                        cita.getId(),
                        cita.getFechaHora(),
                        cita.getEstado(),
                        cita.getPaciente().getCedula() // Incluye la cédula del paciente
                ))
                .collect(Collectors.toList());
    }
    

    public List<Cita> obtenerCitas() {
        return citaRepository.findAll();
    }
    
   public Cita obtenerCitaPorid(Long id) {
        return citaRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("No existe el cliente con ese id: " + id));
    }

    // Crear o actualizar una cita
    public Cita guardar(String cedulaPaciente, Cita cita) {
        // Buscar el paciente por su cédula
        Paciente paciente = pacienteService.obtenerPorCedula(cedulaPaciente);

        // Asociar el paciente a la cita
        cita.setPaciente(paciente);

        // Guardar la cita
        return citaRepository.save(cita);
    }

    public Cita actualizarCita(Long id, Cita citaActualizada) {
        // Buscar la cita existente
        Cita citaExistente = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con ID: " + id));
    
        // Actualizar los campos de la cita
        citaExistente.setFechaHora(citaActualizada.getFechaHora());
        citaExistente.setEstado(citaActualizada.getEstado());
        // Actualizar otros campos necesarios, si aplica
    
        // Guardar los cambios
        return citaRepository.save(citaExistente);
    }

    // Eliminar una cita por su ID
    public void eliminar(Long id) {
        Cita cita = citaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No existe cita con ese id: " + id));
        citaRepository.delete(cita);
    }
}
