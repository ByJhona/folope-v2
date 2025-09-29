package br.byjhona.folope.autenticacao;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtTokenService {

    private static final String SECRET_KEY = "minhaChaveSuperSecretaComPeloMenos32Bytes!";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String gerarToken(String username) {
        return Jwts.builder().subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(key)
                .compact();
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
}