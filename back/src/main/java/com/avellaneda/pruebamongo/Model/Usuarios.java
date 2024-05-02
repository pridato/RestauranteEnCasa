package com.avellaneda.pruebamongo.Model;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.annotation.processing.Generated;
import java.util.Date;

@RequiredArgsConstructor
@Setter
@Getter
@Document(collection = "Usuarios")
public class Usuarios {

    @Id
    private String id;

    @NonNull
    private String nombre;
    @NonNull
    private String apellido;
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private int telefono;
    @NonNull
    private Date fechaRegistro;
    @NonNull
    private String rol;

    private int mesa;
}
