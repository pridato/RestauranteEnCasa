package com.avellaneda.pruebamongo;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PruebaMongoApplication {

    public static void main(String[] args) {
        SpringApplication.run(PruebaMongoApplication.class, args);
    }

    @Bean
    public Dotenv dotenv() {
        return Dotenv.configure().load();
    }
}
