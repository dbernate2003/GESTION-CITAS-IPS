package com.spring.gestion.ips.controller;

import com.spring.gestion.ips.entity.HistorialMedico;
import com.spring.gestion.ips.service.HistorialMedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/historiales") // Define el prefijo para las URL de este controlador
public class HistorialMedicoController {

    @Autowired
    private HistorialMedicoService historialMedicoService;

    // Obtener todos los historiales médicos
    @GetMapping
    public ResponseEntity<Iterable<HistorialMedico>> obtenerTodos() {
        Iterable<HistorialMedico> historiales = historialMedicoService.obtenerTodos();
        return new ResponseEntity<>(historiales, HttpStatus.OK);
    }

    // Obtener un historial médico por ID
    @GetMapping("/{id}")
    public ResponseEntity<HistorialMedico> obtenerPorId(@PathVariable Long id) {
        Optional<HistorialMedico> historial = historialMedicoService.obtenerPorId(id);
        if (historial.isPresent()) {
            return new ResponseEntity<>(historial.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear o actualizar un historial médico
    @PostMapping
    public ResponseEntity<HistorialMedico> guardar(@RequestBody HistorialMedico historialMedico) {
        HistorialMedico nuevoHistorial = historialMedicoService.guardar(historialMedico);
        return new ResponseEntity<>(nuevoHistorial, HttpStatus.CREATED);
    }

    // Eliminar un historial médico por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Optional<HistorialMedico> historial = historialMedicoService.obtenerPorId(id);
        if (historial.isPresent()) {
            historialMedicoService.eliminar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
