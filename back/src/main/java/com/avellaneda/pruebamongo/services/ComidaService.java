package com.avellaneda.pruebamongo.services;

import com.avellaneda.pruebamongo.Model.Comida;
import com.avellaneda.pruebamongo.repository.ComidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComidaService {

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
     * metodo para obtener las comidas cuyo tiempo de preparacion es menor que 15 minutos
     * @return
     */
    private List<Comida> getFoodFast() {
        return this.comidaRepository.findAll().stream().filter(comida -> comida.getTiempoPreparacion() < 3).toList();
    }
}
