package com.spring.gestion.ips.service;

import com.spring.gestion.ips.entity.HistorialMedico;
import com.spring.gestion.ips.repository.HistorialMedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HistorialMedicoService {

    @Autowired
    private HistorialMedicoRepository historialMedicoRepository;

    // Obtener todos los historiales médicos
    public Iterable<HistorialMedico> obtenerTodos() {
        return historialMedicoRepository.findAll();
    }

    // Obtener un historial médico por su ID
    public Optional<HistorialMedico> obtenerPorId(Long id) {
        return historialMedicoRepository.findById(id);
    }

    // Crear o actualizar un historial médico
    public HistorialMedico guardar(HistorialMedico historialMedico) {
        return historialMedicoRepository.save(historialMedico);
    }

    // Eliminar un historial médico por su ID
    public void eliminar(Long id) {
        historialMedicoRepository.deleteById(id);
    }
}
