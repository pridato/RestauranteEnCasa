package com.avellaneda.pruebamongo.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestMessage {

    private  int codigo;
    private  String mensaje;
    private  String error;
    private  String token;
    private  Usuarios datosCliente;
    private  Object otrosDatos;


    public RestMessage(int codigo, String mensaje) {
        this.codigo = codigo;
        this.mensaje = mensaje;
    }
}
