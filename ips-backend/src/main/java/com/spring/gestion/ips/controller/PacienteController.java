package com.spring.gestion.ips.controller;

import com.spring.gestion.ips.entity.Paciente;
import com.spring.gestion.ips.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/ips/pacientes") 
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;


    @GetMapping
    public List<Paciente> obtenerPacientes() {
        return pacienteService.obtenerPacientes();
    }


    @GetMapping("/{cedula}")
    public ResponseEntity<Paciente> obtenerPacientesPorCed(@PathVariable("cedula") String cedula) {
        Paciente paciente = pacienteService.obtenerPorCedula(cedula);
        return ResponseEntity.ok(paciente);
    }

    @PostMapping
    public Paciente guardarPaciente(@RequestBody Paciente paciente) {
        return pacienteService.guardarPaciente(paciente);
    }

    @PutMapping("/{cedula}")
    public ResponseEntity<Paciente> actualizarClientesPorId(
            @PathVariable("cedula") String cedula, 
            @RequestBody Paciente PacienteRequest) {
        Paciente PacienteActualizado = pacienteService.actualizarPaciente(cedula, PacienteRequest);
        return ResponseEntity.ok(PacienteActualizado);
    }
    
    @DeleteMapping("/{cedula}")
    public ResponseEntity<Map<String, Boolean>> eliminarPaciente(@PathVariable("cedula") String cedula) {
        pacienteService.eliminarPaciente(cedula);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

