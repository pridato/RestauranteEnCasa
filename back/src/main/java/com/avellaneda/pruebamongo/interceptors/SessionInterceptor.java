package com.avellaneda.pruebamongo.interceptors;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
@Service
/**
 * servicio para almacenar en un map el total de sesiones activas haciendo peticiones
 */
public class SessionInterceptor implements HandlerInterceptor {

    private Logger logger = LoggerFactory.getLogger(SessionInterceptor.class);

    @Override
    /**
     * metodo para controlar las peticiones entrantes. Cada peticion tiene una sesión única de cada instancia
     * en las peticiones. Las guardamos en un contexto para evitar que se pierdan
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        List<String> sessions = (List<String>) request.getServletContext().getAttribute("sessions");

        // si no hay sesiones activas, creamos un nuevo map
        if(sessions == null){
            sessions = new ArrayList<>();
        }

        // el problema ahora mismo que un usuario navegando en la aplicación no para de crear nuevas sesiones activas
        // podríamos filtrar para solo dar una sesion en la pagina de login, cuando el redirect ha sido ok

        // Tomamos como nuevos usuarios conectados todos los que estén haciendo peticiones a login
        if(request.getRequestURI().equals("/Cliente/login") && request.getMethod().equals("GET")){

            // las requests tienen guardado una sesion unica para cada instancia. Creamos una clase aux. Y lo añadimos
            // como storage general de la aplicación
            String sessionId = request.getSession().getId();
            sessions.add(sessionId);
            request.getServletContext().setAttribute("sessions", sessions);
        }
        return true;
    }

}
