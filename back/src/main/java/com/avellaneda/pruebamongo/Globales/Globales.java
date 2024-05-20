package com.avellaneda.pruebamongo.Globales;

import io.github.cdimascio.dotenv.Dotenv;

public class Globales {

    static Dotenv dotenv = Dotenv.configure().load();

    public static final String googleClientId = dotenv.get("GOOGLE_CLIENT_ID");
    public static final String googleClientSecret = dotenv.get("GOOGLE_CLIENT_SECRET");
    public static final String googleRedirectUri = "http://localhost:8080/Cliente/login";
}
