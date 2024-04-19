package com.avellaneda.pruebamongo.security;

import com.avellaneda.pruebamongo.Model.Usuarios;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtTokenProvider {

  @Value("${jwt.expirationTime}")
  private Long expiALong;

  @Value("${jwt.token}")
  private String token;

  /**
   *
   * @param usuario
   * @return creamos dos fechas. Creación jwt y expiración (conf. 1 hora) y lo creamos con nombre x ejem
   * Necesitamos a partir de ahora este jwt para enviar al front y meterlo siempre en los interceptors
   */
  public String generarToken(Usuarios usuario) {
    Date now = new Date();
    Date expiration = new Date(now.getTime() + expiALong);

    return Jwts.builder()
      .setSubject(usuario.getNombre())
      .setIssuedAt(now)
      .setExpiration(expiration)
      .signWith(Keys.hmacShaKeyFor(token.getBytes()))
      .compact();
  }

  /**
   *
   * @param token
   * @return nos devuelve el body validado del token a través de los claims...
   */
  public Claims validateToken(String token) {
    System.out.println("token nuestro = " +  this.token);
    System.out.println("token nuestro = " +  token);
    try {
      Jws<Claims> claimsJws = Jwts.parserBuilder()
        .setSigningKey(Keys.hmacShaKeyFor(this.token.getBytes()))
        .build()
        .parseClaimsJws(token);

      return claimsJws.getBody();
    } catch (Exception e) {
      // El token no es válido
      return null;
    }
  }
}
