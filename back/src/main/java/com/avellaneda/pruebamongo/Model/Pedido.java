package com.avellaneda.pruebamongo.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "Pedidos")
public class Pedido {

    /**
     * el pedido tendrá una referencia directa hacia los usuarios
     * el id del cocinero en realidad apunta a la tabla usuarios cuyo rol sea COCINERO
     */
    @Id
    private String id;
    private String estado;
    private String usuarioId;
    private List<ComidaPedido> comidas;
}
