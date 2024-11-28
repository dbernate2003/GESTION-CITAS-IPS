package com.spring.gestion.ips.service;

import com.spring.gestion.ips.entity.Paciente;
import com.spring.gestion.ips.exeption.ResourceNotFoundException;
import com.spring.gestion.ips.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

   
    public List<Paciente> obtenerPacientes() {
        return pacienteRepository.findAll();
    }


    public Paciente obtenerPorCedula(String cedula) {
        return pacienteRepository.findById(cedula).orElseThrow(()->new ResourceNotFoundException("No existe el cliente con esa cedula: " + cedula));
    }


    public Paciente guardarPaciente(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public void eliminarPaciente(String cedula) {
        Paciente paciente = pacienteRepository.findById(cedula).orElseThrow(() -> new ResourceNotFoundException("No existe el cliente con esa cedula: " + cedula));
        pacienteRepository.delete(paciente);
    }

    public Paciente actualizarPaciente(String cedula, Paciente pacienteRequest) {
        Paciente paciente = pacienteRepository.findById(cedula)
            .orElseThrow(() -> new ResourceNotFoundException("No existe el paciente con esa cedula: " + cedula));
        
        // Actualizar los atributos del cliente con los datos del request
        paciente.setCedula(pacienteRequest.getCedula());
        paciente.setNombreCompleto(pacienteRequest.getNombreCompleto());
        paciente.setCorreo(pacienteRequest.getCorreo());
        paciente.setTelefono(pacienteRequest.getTelefono());
        paciente.setDireccion(pacienteRequest.getDireccion());
        paciente.setRol(pacienteRequest.getRol());

        // Guardar el cliente actualizado en la base de datos
        return pacienteRepository.save(paciente);
    }
}
