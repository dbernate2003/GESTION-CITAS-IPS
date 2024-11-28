package com.spring.gestion.ips.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Getter
@Setter
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private LocalDateTime fechaHora; // Fecha y hora de la cita
    private String estado; // Estado de la cita (ej. "Programada", "Cancelada", "Completada")

    @ManyToOne
    @JsonBackReference 
    private Paciente paciente; // Relación con la entidad Paciente
    @OneToOne(mappedBy = "cita")
    private Notificacion notificacion; // Relación uno-a-uno con Notificacion
}
