package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.Model.Comida;
import com.avellaneda.pruebamongo.repository.ComidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurantes")
@CrossOrigin(origins = "http://localhost:4200")
public class RestauranteController {

    @Autowired
    private ComidaRepository comidaRepository;

    // get all comidas
    @GetMapping("/comidas")
    public ResponseEntity<?> getAllComidas(){
        try {
            List<Comida> comidas = comidaRepository.findAll();
            return ResponseEntity.status(200).body(comidas);
        } catch(Exception e){
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/comidas/{id}")
    public ResponseEntity<?> getComidaById(@PathVariable String id){
        try {
            Comida comida = comidaRepository.findById(id).orElse(new Comida());
            System.out.println("comida: " + comida);
            return ResponseEntity.status(200).body(comida);
        } catch(Exception e){
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
