package com.avellaneda.pruebamongo.services;

import org.springframework.stereotype.Service;

@Service
public class GoogleLoginService {

    /**
     * metodo para redireccionar a la URL de inicio de sesión de Google
     * @return
     */
    public String getGoogleRedirect() {
        return "redirect:/oauth2/authorization/google";
    }
}
