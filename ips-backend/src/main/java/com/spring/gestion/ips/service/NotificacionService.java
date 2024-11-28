package com.spring.gestion.ips.service;

import com.spring.gestion.ips.entity.Notificacion;
import com.spring.gestion.ips.repository.NotificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotificacionService {

    @Autowired
    private NotificacionRepository notificacionRepository;

    public Notificacion crearNotificacion(Notificacion notificacion) {
        return notificacionRepository.save(notificacion);
    }

    public Optional<Notificacion> obtenerNotificacionPorId(Long id) {
        return notificacionRepository.findById(id);
    }

    public void eliminarNotificacion(Long id) {
        notificacionRepository.deleteById(id);
    }
}
