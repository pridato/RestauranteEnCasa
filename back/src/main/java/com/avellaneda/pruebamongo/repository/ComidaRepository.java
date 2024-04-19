package com.avellaneda.pruebamongo.repository;

import com.avellaneda.pruebamongo.Model.Comida;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ComidaRepository extends MongoRepository<Comida, String> {
}
