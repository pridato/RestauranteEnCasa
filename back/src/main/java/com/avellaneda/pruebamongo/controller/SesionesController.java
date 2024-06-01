package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.services.SesionesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Sesiones")
@CrossOrigin(origins = "http://localhost:4200")
public class SesionesController {

    @Autowired
    private SesionesService sesionesService;

    @GetMapping("/count")
    public int getCountSesiones() {
        return sesionesService.countSessions();
    }

}
