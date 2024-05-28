package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.Model.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    // especificar de las rooms, la comunicación entre dos clientes se hace a partir de estas salas o rooms
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage Chat(@DestinationVariable String roomId, ChatMessage message) {
        return message;
    }
}
