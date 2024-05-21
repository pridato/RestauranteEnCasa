package com.avellaneda.pruebamongo.services;

import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.Model.Usuarios;
import com.avellaneda.pruebamongo.repository.UsuarioRepository;
import com.avellaneda.pruebamongo.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

  private static final Logger logger = LoggerFactory.getLogger(UserService.class);
  // actualizado
  @Autowired
  private UsuarioRepository usuarioRepository;

  @Autowired
  private JwtTokenProvider jwtTokenProvider;
  /**
   *
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
   *
   * @param email
   * @param password
   * @return logueamos el usuario y devolvemos el objeto de cliente con mensaje de todo ok. Pendiente mejorar insertando jwt
   */
  public RestMessage login(String email, String password) {

    Usuarios usuario = usuarioRepository.findByEmailAndPassword(email, password);
    RestMessage restMessage = new RestMessage();
    // si hemos encontrado el objeto usuario está bien. TODO password hashed...
    if(usuario != null) {
      // una vez logueado lo insertamos en el message para enviar al controller y directo a angular... pendiente mejora verificación de si es cocinero.
      // Por el momento no añadido.
      restMessage.setCodigo(0);
      restMessage.setDatosCliente(usuario);
      restMessage.setToken(jwtTokenProvider.generarToken(usuario));
    }

    return restMessage;
  }

    /**
     * a partir del email simplemente devolvemos el obj. usuario Recordar que lleva la seguridad de las jwt
     * @param email
     * @return
     */
    public Usuarios getUsuarioByEmail(String email) {
      return this.usuarioRepository.findByEmail(email);
    }

  /**
   * a partir del id simplemente devolvemos el obj. usuario Recordar que lleva la seguridad de las jwt
   * @param id
   * @return
   */
  public Usuarios getUsuarioById(String id) {
    Optional<Usuarios> usuariosOptional = this.usuarioRepository.findById(id);
    Usuarios usuarios = null;
    if(usuariosOptional.isPresent()){
      usuarios = usuariosOptional.get();
    }

    return usuarios;
  }
}
