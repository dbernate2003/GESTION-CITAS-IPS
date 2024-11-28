package com.spring.gestion.ips.exeption;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ResponseStatus;

//excepcion personalizada 
@ResponseStatus(value = HttpStatus.NOT_FOUND)

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message){
        super(message);
    }
}