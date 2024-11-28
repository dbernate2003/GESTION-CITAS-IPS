package com.spring.gestion.ips.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Paciente {
    @Id
    private String cedula;
    private String nombreCompleto;
    private String correo;
    private String telefono;
    private String direccion;
    private String rol; // Puede ser "Paciente" o "Administrador"

    @OneToMany(mappedBy = "paciente")
    @JsonManagedReference//serializa normal
    private List<Cita> citas; // Relación uno-a-muchos con Cita

    @OneToMany(mappedBy = "paciente")
    private List<HistorialMedico> historialMedico; // Relación uno-a-muchos con HistorialMedico
}
