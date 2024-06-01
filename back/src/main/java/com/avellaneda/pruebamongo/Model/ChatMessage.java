package com.avellaneda.pruebamongo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class ChatMessage {
    private String message;
    Usuarios user;
    private Date fecha_envio;
}
