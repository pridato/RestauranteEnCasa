package com.avellaneda.pruebamongo.repository;

import com.avellaneda.pruebamongo.Model.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PedidoRepository extends MongoRepository<Pedido, String> {
    List<Pedido> findByUsuarioId(String usuarioId);
}
