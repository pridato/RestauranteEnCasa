package com.avellaneda.pruebamongo.services;

import com.avellaneda.pruebamongo.Model.Comida;
import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.enums.ClasesComida;
import com.avellaneda.pruebamongo.repository.ComidaRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ComidaService {

    private static final Logger logger = LogManager.getLogger(ComidaService.class);

    @Autowired
    private ComidaRepository comidaRepository;

    public List<Comida> getAllComida() {
        return this.comidaRepository.findAll();
    }

    public Comida getComidaId(String id) {
        Comida comida = null;
        Optional<Comida> comidaOptional = this.comidaRepository.findById(id);
        if(comidaOptional.isPresent()){
            comida = comidaOptional.get();
        }

        return comida;
    }

    /**
     * metodo para guardar una comida
     * @param comida
     * @return restMessage del resultado d la operacion
     */
    public RestMessage addFood(Comida comida) {
        try {
            this.comidaRepository.save(comida);
            return new RestMessage(201, "Comida guardada correctamente");
        } catch(Exception ex) {
            logger.error("Error: {}", ex.getMessage());
            return new RestMessage(400, "Error: " + ex.getMessage());
        }

    }


    /**
     * metodo para obtener las categorias de las comidas
     * @return lista de categorias
     */
    public List<String> getCategories() {
        return this.comidaRepository.findAll().stream().map(Comida::getTipo).distinct().toList();
    }

    /**
     * metodo para obtener las comidas por categoria
     * @param category
     * @return
     */
    public List<Comida> getComidaByCategory(String category) {
        if(category.equals("COMIDAS RAPIDAS")) {
            return this.getFoodFast();
        }
        return this.comidaRepository.findByTipo(category);
    }

    /**
     * metodo para importar comidas desde un archivo excel
     * @param file
     * @return
     */
    public ResponseEntity<?> importFood(MultipartFile file) {
        RestMessage restMessage = new RestMessage();
        try {

            Boolean isExcel = checkIsExcel(file);
            if(!isExcel){
                restMessage.setCodigo(400);
                restMessage.setMensaje("El archivo no es un excel");

                return ResponseEntity.status(400).body(restMessage);
            }
            List<Comida> comidasImport = this.readExcel(file);

            restMessage.setCodigo(200);
            restMessage.setMensaje("Comidas importadas correctamente");


            return ResponseEntity.status(200).body(restMessage);
        } catch (Exception e){
            logger.error("Error: {}", e.getMessage());
            restMessage.setCodigo(500);
            restMessage.setMensaje("Error: No has importado ningun archivo");
            return ResponseEntity.status(500).body(restMessage);
        }
    }

    /**
     * metodo para obtener las categorias de las comidas
     * @return lista de categorias
     */
    public List<ClasesComida> getCategoriesEnum() {
        return List.of(ClasesComida.values());
    }

    /**
     * metodo para verificar si el archivo es un excel
     * @param file file a verificar
     * @return true si es un excel, false si no lo es
     */
    private Boolean checkIsExcel(MultipartFile file) {
        return Objects.equals(file.getContentType(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    /**
     * metodo para leer el archivo excel
     * @param file
     * @return lista de comidas leidas
     */
    private List<Comida> readExcel(MultipartFile file) {
        return new ArrayList<>();
    }

    /**
     * metodo para obtener las comidas cuyo tiempo de preparacion es menor que 15 minutos
     * @return
     */
    private List<Comida> getFoodFast() {
        return this.comidaRepository.findAll().stream().filter(comida -> comida.getTiempoPreparacion() < 3).toList();
    }
}
