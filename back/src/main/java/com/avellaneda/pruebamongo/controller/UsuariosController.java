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
    RestMessage restMessage = userService.crearUsuario(usuario);
    return ResponseEntity.status(200).body(restMessage);
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
    return ResponseEntity.status(200).body(restMessage);
  }


  @GetMapping("/{id}")
  public ResponseEntity<?> getUsuarioById(@PathVariable String id) {
    try {
      return ResponseEntity.status(200).body(usuarioRepository.findById(id));
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error: " + e.getMessage());
    }
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
