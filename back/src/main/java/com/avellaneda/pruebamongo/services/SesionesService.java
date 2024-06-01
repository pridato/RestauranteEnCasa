package com.avellaneda.pruebamongo.services;

import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * clase auxiliar. Básicamente hace un count del total del atributo sessions del contexto de la aplicaciojnm
 */
@Service
public class SesionesService {

    @Autowired
    private ServletContext servletContext;

    public int countSessions() {
        List<String> sessions = (List<String>) servletContext.getAttribute("sessions");
        return sessions != null ? sessions.size() : 0;
    }
}
