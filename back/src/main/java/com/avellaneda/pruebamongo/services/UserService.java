package com.avellaneda.pruebamongo.services;

import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.Model.Usuarios;
import com.avellaneda.pruebamongo.repository.UsuarioRepository;
import com.avellaneda.pruebamongo.security.JwtTokenProvider;
import com.avellaneda.pruebamongo.utils.Consts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    /**
     * @param usuario
     * @return enviamos el objeto usuario a crear y devolvemos el rest message con el usuario para angular
     */
    public RestMessage crearUsuario(Usuarios usuario) {

        // 1º comprobamos todos los errores posibles del formulario
        RestMessage restMessage = new RestMessage();
        restMessage = checkErrores(usuario);

        if(!restMessage.getError().equals(""))  {
            // hay errores del form
            return restMessage;
        }

        usuario.setEmailVerificado(false);
        String passwordEncoded = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passwordEncoded);

        // generamos un jwt para enviar x el email a la confirmacion verificando que es esa persona
        String jwt = jwtTokenProvider.generarToken(usuario);

        String subject = "Verificación de correo electrónico";

        String text = "Hola,\n\n"
                + "Gracias por registrarte. Para verificar tu correo electrónico, haz clic en el siguiente enlace:\n\n"
                + Consts.URL + "/Cliente/verify-email?email=" + usuario.getEmail() + "&jwt=" + jwt + "\n\n" + "Atentamente,\n"
                + "TuRestauranteEnCasa";

        try {
            // enviamos el email al usuario para verificar
            SimpleMailMessage SMmessage = new SimpleMailMessage();
            SMmessage.setTo(usuario.getEmail());
            SMmessage.setSubject(subject);
            SMmessage.setText(text);
            mailSender.send(SMmessage);

            usuarioRepository.save(usuario);


        } catch(Exception ex) {
            logger.error("Error al enviar el email de verificación", ex);
            restMessage.setCodigo(500);
            restMessage.setMensaje("Error al enviar el email de verificación");
            return restMessage;
        }


        restMessage.setCodigo(200);
        restMessage.setMensaje("Usuario creado correctamente");
        restMessage.setDatosCliente(usuario);
        return restMessage;
    }

    /**
     * metodo para comprobar que todos los validadores del formulario son correctos
     * @param usuario usuario a verificar
     * @return si hay algo mal devuelve rest message 500 con el mensaje de error
     */
    private RestMessage checkErrores(Usuarios usuario) {
        RestMessage restMessage = new RestMessage();
        restMessage.setError(""); // -> si se mantiene asi es xk no ha habido errores
        restMessage.setCodigo(400);

        if(usuario.getEmail().isEmpty()) {
            restMessage.setError("*El email es obligatorio");
        } else if(!usuario.getEmail().contains("@")) {
            restMessage.setError("*El email no tiene el formato correcto");
        }

        if(usuario.getPassword().isEmpty()) {
            restMessage.setError("*La contraseña es obligatoria");
        } else if (!usuario.getPassword().matches("^(?=.*[A-Z])(?=.*\\d).{6,}$")) {
            restMessage.setError("*La contraseña debe tener al menos 6 caracteres, una mayúscula y un número");
        }

        // comprobamos que el email no exista ya
        boolean existeEmail = usuarioRepository.findAll().stream().anyMatch(user -> user.getEmail().equals(usuario.getEmail()));

        if(existeEmail) {
            restMessage.setError("*El email está en uso");
        }

        // comprobamos que el telefono tiene 9 caracteres
        if (String.valueOf(usuario.getTelefono()).length() != 9) {
            restMessage.setError("*El teléfono debe tener 9 caracteres");
        }

        return restMessage;
    }

    /**
     * metodo para verificar el email del usuario, si el jwt es invalido no deja
     * @param email email de quien se ha creado la cuenta
     * @param token jwt creado a partir del user
     * @return rest message con el result. operacion
     */
    public RestMessage verifyEmail(String email, String token) {
        RestMessage restMessage = new RestMessage();
        Usuarios usuario = usuarioRepository.findByEmail(email);

        if (usuario == null) {
            restMessage.setCodigo(1);
            restMessage.setMensaje("Email no encontrado");
            return restMessage;
        }

        if (!jwtTokenProvider.validateToken(token).isEmpty()) {
            usuario.setEmailVerificado(true);
            usuarioRepository.save(usuario);
            restMessage.setCodigo(200);
            restMessage.setMensaje("Email verificado correctamente");
        } else {
            restMessage.setCodigo(1);
            restMessage.setMensaje("Token inválido");
        }

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

        // comprobamos que la contraseña es correcta
        if(!passwordEncoder.matches(password, usuarios.getPassword())) {
            // al tener algunos usuarios creados con la password directamente se comprueba asi...
            if(!password.equals(usuarios.getPassword())){
                restMessage.setCodigo(1);
                restMessage.setMensaje("Contraseña incorrecta");
                restMessage.setOtrosDatos(tries);
                return restMessage;
            }
        }


        if(!usuarios.isEmailVerificado()) {
            restMessage.setCodigo(1);
            restMessage.setMensaje("Email no verificado");
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
