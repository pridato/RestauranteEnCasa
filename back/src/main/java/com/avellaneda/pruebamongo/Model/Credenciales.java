package com.avellaneda.pruebamongo.Model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@RequiredArgsConstructor
@Setter
@Getter
public class Credenciales {
    private String usuario;
    private String password;
}
