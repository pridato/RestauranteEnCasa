package com.avellaneda.pruebamongo.repository;

import com.avellaneda.pruebamongo.Model.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PedidoRepository extends MongoRepository<Pedido, String> {
}
