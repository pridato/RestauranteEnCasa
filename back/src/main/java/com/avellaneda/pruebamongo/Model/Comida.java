package com.avellaneda.pruebamongo.Model;

import com.avellaneda.pruebamongo.enums.ClasesComida;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@ToString
@Document(collection = "Comidas")
public class Comida {
    @Id
    private String id;
    private String nombre;
    private String tipo;
    private List<String> ingredientes;
    private InformacionAdicional informacionAdicional;
    private double precio;
    private String imagenBASE64;
    private String especificacion;
    private int tiempoPreparacion; // tiempo en minutos
    private int vecesComprado = 0;



    @Getter 
    @Setter
    @NoArgsConstructor
    public static class InformacionAdicional {
        private int calorias;
        private int grasas;
        private int proteinas;
        private int carbohidratos;

    }
}
