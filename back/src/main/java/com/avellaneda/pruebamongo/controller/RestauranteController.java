package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.Model.Comida;
import com.avellaneda.pruebamongo.repository.ComidaRepository;
import com.avellaneda.pruebamongo.services.ComidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/restaurantes")
@CrossOrigin(origins = "http://localhost:4200")
public class RestauranteController {


    @Autowired
    private ComidaService comidaService;

    // get all comidas
    @GetMapping("/comidas")
    public ResponseEntity<?> getAllComidas(){
        try {
            List<Comida> comidas = comidaService.getAllComida();
            return ResponseEntity.status(200).body(comidas);
        } catch(Exception e){
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/get-comida-id")
    public Comida getComidaById(@RequestParam String id){
        return this.comidaService.getComidaId(id);
    }


    @GetMapping(value = "/get-categories", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> getCategories(){
        try {
            List<String> categories = comidaService.getCategories();
            return ResponseEntity.status(200).body(categories);
        } catch(Exception e){
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping(value = "/filter-by-category", produces = "application/json")
    public ResponseEntity<?> getComidaByCategory(@RequestParam("category") String category){
        try {
            List<Comida> comidas = comidaService.getComidaByCategory(category);
            return ResponseEntity.status(200).body(comidas);
        } catch(Exception e){

            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("get-categories-enum")
    public ResponseEntity<?> getCategoriesEnum(){
        try {
            return ResponseEntity.status(200).body(comidaService.getCategoriesEnum());
        } catch(Exception e){
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/import-food")
    public ResponseEntity<?> importFood(@RequestBody MultipartFile file){
        try {
           return comidaService.importFood(file);
        } catch(Exception e){
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
