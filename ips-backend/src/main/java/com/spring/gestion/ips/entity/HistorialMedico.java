package com.spring.gestion.ips.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class HistorialMedico {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private LocalDate fechaConsulta; // Fecha de la consulta médica
    private String descripcion; // Descripción del examen o tratamiento
    private String resultados; // Resultados de los exámenes, si aplica

    @ManyToOne
    private Paciente paciente; // Relación con la entidad Paciente
}
