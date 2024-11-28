package com.spring.gestion.ips.repository;

import com.spring.gestion.ips.entity.Cita;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CitaRepository extends JpaRepository<Cita, Long> {

    @Query("SELECT c FROM Cita c JOIN FETCH c.paciente")
    List<Cita> obtenerCitasConPacientes();    
}
