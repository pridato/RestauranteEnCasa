package com.avellaneda.pruebamongo.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    @Override
    /**
     * metodo para habilitar un brocker es decir una manera de comunicacion entre el servidor y el cliente
     * Son como los controllers de mvc pero para websocket
     */
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app"); // prefijo para los mensajes que llegan al servidor su destino final
    }

    /**
     * metodo para registrar los endpoints de conexion y cuales pueden acceder
     * @param registry
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat-socket")
                .setAllowedOrigins("*") // -> que clientes pueden conectarse
                .withSockJS();
    }
}
