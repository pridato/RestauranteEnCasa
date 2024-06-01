package com.avellaneda.pruebamongo.Model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ComidaPedido {
    private String comidaId;
    private int cantidad;
}
