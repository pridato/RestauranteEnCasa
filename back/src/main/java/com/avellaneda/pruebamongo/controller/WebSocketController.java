package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.Model.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class WebSocketController {

    private final List<ChatMessage> messages = new ArrayList<>();

    // especificar de las rooms, la comunicación entre dos clientes se hace a partir de estas salas o rooms
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public ChatMessage Chat(@DestinationVariable String roomId, ChatMessage message) {
        messages.add(message);
        return message;
    }

    @GetMapping("/messages")
    public List<ChatMessage> getAllMessages() {
        return messages;
    }
}
