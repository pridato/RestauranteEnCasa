package com.avellaneda.pruebamongo.repository;

import com.avellaneda.pruebamongo.Model.Comida;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ComidaRepository extends MongoRepository<Comida, String> {
}
