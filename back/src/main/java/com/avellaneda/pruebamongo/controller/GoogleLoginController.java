package com.avellaneda.pruebamongo.controller;

import com.avellaneda.pruebamongo.Model.RestMessage;
import com.avellaneda.pruebamongo.services.GoogleLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/google")
@CrossOrigin(origins = "*")
public class GoogleLoginController {

    @Autowired
    private GoogleLoginService googleLoginService;

    @GetMapping(value = "/get-url-redirect", produces = "application/json")
    public String googleLogin() {
        return this.googleLoginService.getGoogleRedirect();
    }

    @GetMapping(value = "/login", produces = "application/json")
    public RedirectView googleOauth(@RequestParam String code,
                                    @RequestParam String scope,
                                    @RequestParam String authuser,
                                    @RequestParam String prompt) {
        return this.googleLoginService.login(code, scope, authuser, prompt);
    }
}
