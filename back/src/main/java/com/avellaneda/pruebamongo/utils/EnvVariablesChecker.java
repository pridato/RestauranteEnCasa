package com.avellaneda.pruebamongo.utils;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EnvVariablesChecker {

    Dotenv dotenv = Dotenv.configure().load();

    String googleClientId = dotenv.get("GOOGLE_CLIENT_ID");
    String googleClientSecret = dotenv.get("GOOGLE_CLIENT_SECRET");

}
