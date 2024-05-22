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
}
