package br.byjhona.folope.autenticacao;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtTokenService {

    private static final String SECRET_KEY = "minhaChaveSuperSecretaComPeloMenos32Bytes!";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());


    public String gerarToken(String nome, String tipo, long expiracaoMilli) {
        return Jwts.builder().subject(nome)
                .issuedAt(new Date())
                .claim("type", tipo)
                .expiration(new Date(System.currentTimeMillis() + expiracaoMilli))
                .signWith(key)
                .compact();
    }

    public Cookie gerarCookieRefreshToken(String nome) {
        String refreshToken = gerarToken(nome, "refresh", 5 * 24 * 60 * 60 * 1000);

        Cookie cookie = new Cookie("refresh_token", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(5 * 24 * 60 * 60);
        return cookie;
    }

    public String obterUsuarioToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build().parseSignedClaims(token).getPayload()
                    .getSubject();
        } catch (JwtException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean isTokenValido(String token, String expectedType) {
        try {
            var claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String type = claims.get("type", String.class);
            return expectedType.equals(type) && claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}