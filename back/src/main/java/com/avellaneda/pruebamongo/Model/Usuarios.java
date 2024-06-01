package com.avellaneda.pruebamongo.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@RequiredArgsConstructor
@NoArgsConstructor
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
    private long telefono;
    @NonNull
    private Date fechaRegistro;
    @NonNull
    private String rol;
    @NonNull
    private boolean emailVerificado;

    private int mesa;
}
