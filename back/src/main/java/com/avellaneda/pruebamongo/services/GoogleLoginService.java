package com.avellaneda.pruebamongo.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

import static com.avellaneda.pruebamongo.Globales.Globales.googleClientId;
import static com.avellaneda.pruebamongo.Globales.Globales.googleRedirectUri;

@Service
public class GoogleLoginService {

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * metodo para redireccionar a la URL de inicio de sesión de Google
     * @return direccion de url de inicio de sesion de google, su popup
     */
    public String getGoogleRedirect() {
        String googleAuthorizationUrl = "https://accounts.google.com/o/oauth2/auth" +
                "?client_id=" + googleClientId +
                "&redirect_uri=" + googleRedirectUri +
                "&response_type=code" +
                "&scope=openid%20email%20profile";

        // lo devolvemos como formato json correcto a través de objectMapper
        Map<String, String> response = new HashMap<>();
        response.put("url", googleAuthorizationUrl);

        try {
            return objectMapper.writeValueAsString(response);
        } catch (Exception e) {
            return null;
        }
    }
}
