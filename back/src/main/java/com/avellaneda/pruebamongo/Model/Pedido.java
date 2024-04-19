package com.avellaneda.pruebamongo.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pedidos")
public class Pedido {

    /**
     * el pedido tendrá una referencia directa hacia los usuarios
     * el id del cocinero en realidad apunta a la tabla usuarios cuyo rol sea COCINERO
     */
    @Id
    private String id;
    private String usuarioId;
    private String cocineroId;
    private String estado;
    private String[] platos;
}
