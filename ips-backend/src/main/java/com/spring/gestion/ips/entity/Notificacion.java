package com.spring.gestion.ips.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter

public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String mensaje; // Contenido del recordatorio o mensaje
    private LocalDateTime fechaEnvio; // Fecha y hora del envío de la notificación

    @OneToOne
    private Cita cita; // Relación con la entidad Cita
}
