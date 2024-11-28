package com.spring.gestion.ips.controller;

import com.spring.gestion.ips.entity.Notificacion;
import com.spring.gestion.ips.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    // Crear una nueva notificación
    @PostMapping
    public ResponseEntity<Notificacion> crearNotificacion(@RequestBody Notificacion notificacion) {
        Notificacion nuevaNotificacion = notificacionService.crearNotificacion(notificacion);
        return new ResponseEntity<>(nuevaNotificacion, HttpStatus.CREATED);
    }

    // Obtener una notificación por ID
    @GetMapping("/{id}")
    public ResponseEntity<Notificacion> obtenerNotificacion(@PathVariable Long id) {
        Optional<Notificacion> notificacion = notificacionService.obtenerNotificacionPorId(id);
        return notificacion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar una notificación por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNotificacion(@PathVariable Long id) {
        Optional<Notificacion> notificacion = notificacionService.obtenerNotificacionPorId(id);
        if (notificacion.isPresent()) {
            notificacionService.eliminarNotificacion(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
