package com.spring.gestion.ips.entity;

import java.time.LocalDateTime;

// Este DTO incluirá los datos que quieres enviar al frontend
public class CitaDTO {
    private long id;
    private LocalDateTime fechaHora;
    private String estado;
    private String pacienteCedula;

    // Constructor
    public CitaDTO(long id, LocalDateTime fechaHora, String estado, String pacienteCedula) {
        this.id = id;
        this.fechaHora = fechaHora;
        this.estado = estado;
        this.pacienteCedula = pacienteCedula;
    }

    // Getters y setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getPacienteCedula() {
        return pacienteCedula;
    }

    public void setPacienteCedula(String pacienteCedula) {
        this.pacienteCedula = pacienteCedula;
    }
}

