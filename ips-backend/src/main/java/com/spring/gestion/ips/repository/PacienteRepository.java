package com.spring.gestion.ips.repository;

import com.spring.gestion.ips.entity.Paciente;


import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, String> {

}
