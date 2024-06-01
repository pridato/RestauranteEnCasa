package com.avellaneda.pruebamongo.services;

import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.Model.Usuarios;
import com.avellaneda.pruebamongo.repository.UsuarioRepository;
import com.avellaneda.pruebamongo.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    // variable para controlar los intentos de login
    private int tries = 0;
    // actualizado
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    // autowired al haberse configurado en securityconffig...
    private PasswordEncoder passwordEncoder ;

    /**
     * @param usuario
     * @return enviamos el objeto usuario a crear y devolvemos el rest message con el usuario para angular
     */
    public RestMessage crearUsuario(Usuarios usuario) {
        usuarioRepository.save(usuario);
        RestMessage restMessage = new RestMessage();
        restMessage.setCodigo(0);
        restMessage.setDatosCliente(usuario);
        restMessage.setMensaje("Cliente creado correctamente");

        return restMessage;
    }

    /**
     * @param email
     * @param password
     * @return logueamos el usuario y devolvemos el objeto de cliente con mensaje de todo ok. Pendiente mejorar insertando jwt
     */
    public RestMessage login(String email, String password) {

        // rest message to notify angular
        RestMessage restMessage = new RestMessage();
        Usuarios usuarios = usuarioRepository.findByEmail(email);

        // email no encontrado... devolver error
        if (usuarios == null) {
            restMessage.setCodigo(1);
            restMessage.setMensaje("Email no encontrado");
            restMessage.setOtrosDatos(tries);
            return restMessage;
        }

        // encode la contraseña y comprobar si todo ok
        // TODO encode en el registro...
        // String passwordEncoded = passwordEncoder.encode(password);
        // String passwordDTOEncoded = passwordEncoder.encode(usuarios.getPassword());

        if(!password.equals(usuarios.getPassword())){
            restMessage.setCodigo(1);
            restMessage.setMensaje("Contraseña incorrecta");
            restMessage.setOtrosDatos(tries);
            return restMessage;
        }

        // si sigue aquí reiniciar errores y devolver okkk
        restMessage.setCodigo(0);
        restMessage.setDatosCliente(usuarios);
        restMessage.setMensaje("Cliente logueado correctamente");

        // mandamos el jwt para autorizar todas las operaciones
        restMessage.setToken(jwtTokenProvider.generarToken(usuarios));

        return restMessage;
    }

    /**
     * a partir del email simplemente devolvemos el obj. usuario Recordar que lleva la seguridad de las jwt
     *
     * @param email
     * @return
     */
    public Usuarios getUsuarioByEmail(String email) {
        return this.usuarioRepository.findByEmail(email);
    }

    /**
     * a partir del id simplemente devolvemos el obj. usuario Recordar que lleva la seguridad de las jwt
     *
     * @param id
     * @return
     */
    public Usuarios getUsuarioById(String id) {
        Optional<Usuarios> usuariosOptional = this.usuarioRepository.findById(id);
        Usuarios usuarios = null;
        if (usuariosOptional.isPresent()) {
            usuarios = usuariosOptional.get();
        }

        return usuarios;
    }
}
