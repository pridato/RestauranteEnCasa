package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.Model.Usuarios;
import com.avellaneda.pruebamongo.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.avellaneda.pruebamongo.repository.UsuarioRepository;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/Cliente")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuariosController {

  private static final Logger logger = LoggerFactory.getLogger(UsuariosController.class);

  @Autowired
  private UserService userService;

  @Autowired
  private UsuarioRepository usuarioRepository;

  @PostMapping("/add")
  public ResponseEntity<?> saveUsuario(@RequestBody Usuarios usuario) {
    try {
      RestMessage restMessage = userService.crearUsuario(usuario);
      return ResponseEntity.status(restMessage.getCodigo()).body(restMessage);
    } catch(Exception e) {
      RestMessage restMessage = new RestMessage();
        restMessage.setCodigo(500);
        restMessage.setMensaje("Error: " + e.getMessage());
      return ResponseEntity.status(restMessage.getCodigo()).body(restMessage);
    }

  }

  @GetMapping("/verify-email")
  public RedirectView verifyEmail(@RequestParam("email") String email, @RequestParam("jwt") String token) {
      RestMessage restMessage = userService.verifyEmail(email, token);
      return new RedirectView("http://localhost:4200/");
  }



  // get all users
  @GetMapping
  public ResponseEntity<?> getAllUsuarios() {
    try {
      return ResponseEntity.status(200).body(usuarioRepository.findAll());
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
  }


  @GetMapping("/login")
  public ResponseEntity<?> getUsuarioByCredenciales(@RequestParam String email, @RequestParam String password) {
    RestMessage restMessage = userService.login(email, password);
    if (restMessage.getCodigo() == 0) {
      return ResponseEntity.status(200).body(restMessage);
    } else {
      return ResponseEntity.status(401).body(restMessage);
    }
  }

  @GetMapping("/get-cliente-email")
    public Usuarios getUsuarioByEmail(@RequestParam String email) {
        return this.userService.getUsuarioByEmail(email);
    }


  @GetMapping("/obtener-cliente-id")
  public Usuarios getUsuarioById(@RequestParam String id) {
    return this.userService.getUsuarioById(id);
  }

  // updte user, find by id and update the full user
  @PostMapping("/update")
  public ResponseEntity<?> updateUsuario(@RequestBody Usuarios usuario) {
    try {
      usuarioRepository.save(usuario);
      return ResponseEntity.status(200).body("Usuario actualizado");
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
  }
}
