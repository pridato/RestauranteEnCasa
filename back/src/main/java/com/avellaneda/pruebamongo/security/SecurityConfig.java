package com.avellaneda.pruebamongo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.bind.annotation.PostMapping;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * @param http
     * @return permitimos la conexion sin autentificar en Cliente y en todas las demas ha de estar
     * autentificado a través de jwt para garantizar una seguridad en la app
     * @throws Exception
     */
    @Bean

    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(request -> request.requestMatchers(
                        new AntPathRequestMatcher("/Cliente/**")).permitAll())
                .authorizeHttpRequests(request -> request.requestMatchers(new
                                AntPathRequestMatcher("/**"))
                        .authenticated()

                )
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
