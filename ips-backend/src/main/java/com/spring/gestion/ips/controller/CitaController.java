package com.spring.gestion.ips.controller;

import com.spring.gestion.ips.entity.Cita;
import com.spring.gestion.ips.entity.CitaDTO;
import com.spring.gestion.ips.service.CitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/ips/citas") // Define el prefijo para las URL de este controlador
public class CitaController {

    @Autowired
    private CitaService citaService;

    // Obtener todas las citas
    @GetMapping
    public List<CitaDTO> obtenerTodas() {
        return citaService.obtenerCitasDTO();
    }

    // Obtener una cita por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cita> obtenerCitasPorId(@PathVariable("id") Long id) {
        Cita cita = citaService.obtenerCitaPorid(id);
        return ResponseEntity.ok(cita);
    }

    @PutMapping("/{id}")
public ResponseEntity<Cita> actualizarCita(@PathVariable("id") Long id, @RequestBody Cita citaActualizada) {
    Cita cita = citaService.actualizarCita(id, citaActualizada);
    return ResponseEntity.ok(cita);
}

    // Crear o actualizar una cita
    @PostMapping("/{id}") //id es la cedula
    public ResponseEntity<Cita> guardar(@PathVariable("id") String cedulaPaciente,@RequestBody Cita cita) {
        Cita nuevaCita = citaService.guardar(cedulaPaciente, cita);
        return new ResponseEntity<>(nuevaCita, HttpStatus.CREATED);
    }

    // Eliminar una cita por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminar(@PathVariable("id") Long id) {
        citaService.eliminar(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
