package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.services.GoogleLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/google")
@CrossOrigin(origins = "http://localhost:4200")
public class GoogleLoginController {

    @Autowired
    private GoogleLoginService googleLoginService;

    @GetMapping("/login/google")
    public String googleLogin() {
        return this.googleLoginService.getGoogleRedirect();
    }

}
