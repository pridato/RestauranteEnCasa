package com.avellaneda.pruebamongo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ChatMessage {
    private String message;
    Usuarios user;
}
