package com.avellaneda.pruebamongo.services;

import com.avellaneda.pruebamongo.Globales.Globales;
import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.Model.Usuarios;
import com.avellaneda.pruebamongo.repository.UsuarioRepository;
import com.avellaneda.pruebamongo.security.JwtTokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;
import static com.avellaneda.pruebamongo.Globales.Globales.*;

@Service
public class GoogleLoginService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    private RestTemplate restTemplate = new RestTemplate();

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
            /**
             * importante para el redirect lo enviamos otra vez a spring para ver que hacer con el objeto del usuario. Parms importantes a leer
             * code: codigo de autorizacion
             * scope: permisos solicitados
             * authuser: usuario autenticado al utilizar diferentes flujos
             * prompt: indica si se debe mostrar la pantalla de consentimiento
             *
             */
            return objectMapper.writeValueAsString(response);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Metodo para loguearse con Google.
     * @param code Codigo de autorizacion.
     * @param scope Permisos solicitados.
     * @param authuser Usuario autenticado al utilizar diferentes flujos.
     * @param prompt Indica si se debe mostrar la pantalla de consentimiento.
     * @return Objeto con el usuario logueado y su token.
     */
    public RedirectView login(String code, String scope, String authuser, String prompt) {
        // 1º intercambiamos el token de autorizacion por el token de acceso

        // creamos una url para acceder al token que nos habilita el acceso a la informacion del usuario
        HttpEntity<MultiValueMap<String, String>> request = createRequest(code);
        String accessToken = getAccessToken(request);
        Map<String, Object> userInfo = getUserInfo(accessToken);

        RestMessage rest = new RestMessage();
        rest.setToken(accessToken);
        rest.setOtrosDatos(userInfo);

        // 3º comprobamos si el usuario ya existe en la base de datos x si es necesario crear un usuario con su email como verificación
        // más que nada x la necesidad de crear un objeto usuario para el jwt
        Boolean userExist = checkUserExist((String) userInfo.get("email"));
        Usuarios usuario = null;
        if(!userExist) {
            usuario = new Usuarios();
            usuario.setEmail((String) userInfo.get("email"));
            usuario.setNombre((String) userInfo.get("name"));
            usuario.setApellido((String) userInfo.get("family_name"));
            this.usuarioRepository.save(usuario);
            rest.setDatosCliente(usuario);
        } else {
            usuario = this.usuarioRepository.findByEmail((String) userInfo.get("email"));
            rest.setDatosCliente(usuario);
        }

        String jwt = jwtTokenProvider.generarToken(usuario);

        // devolvemos un redirect con los params email y jwt
        return new RedirectView("http://localhost:4200/Cliente/Login?email=" + usuario.getEmail() + "&jwt=" + jwt);
    }

    /**
     * metodo para generar request de intercambio de token
     * @param code -> codigo de autorizacion
     * @return la entidad http creada
     */
    private  HttpEntity<MultiValueMap<String, String>> createRequest(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", googleClientId);
        params.add("client_secret", googleClientSecret);
        params.add("redirect_uri", googleRedirectUri);
        params.add("grant_type", "authorization_code");

        return new HttpEntity<>(params, headers);
    }

    /**
     * metodo para obtener el token de acceso a partir del request
     * @param request -> request creada createRequest
     * @return el token de acceso
     */
    private String getAccessToken(HttpEntity<MultiValueMap<String, String>> request ) {
        // tokenUrl => globales
        try {
            ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, Map.class);
            Map tokenResponse = response.getBody();
            if (tokenResponse == null || !tokenResponse.containsKey("access_token")) {
                throw new RuntimeException("Error al obtener el token de acceso");
            }
            return (String) tokenResponse.get("access_token");
        } catch(Exception ex) {
            System.err.println(ex.getMessage());
        }

        return "";
    }

    /**
     * metodo para obtener la informacion del usuario a partir del token de acceso
     * @param accessToken -> token de acceso
     * @return la informacion del usuario
     */
    private Map<String, Object> getUserInfo(String accessToken) {
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.setBearerAuth(accessToken);

        HttpEntity<String> userInfoRequest = new HttpEntity<>(userInfoHeaders);

        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoRequest, Map.class);
        return (Map<String, Object>) userInfoResponse.getBody();
    }

    /**
     * metodo para verificar si el usuario ya existe en la base de datos
     * @param email
     * @return true si el usuario existe, false en caso contrario
     */
    private Boolean checkUserExist(String email) {
        return this.usuarioRepository.findByEmail(email) != null;
    }
}
