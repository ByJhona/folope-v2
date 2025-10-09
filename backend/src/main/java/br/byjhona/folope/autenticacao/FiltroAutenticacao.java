package br.byjhona.folope.autenticacao;

import br.byjhona.folope.domain.usuario.UsuarioLoginDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

public class FiltroAutenticacao extends UsernamePasswordAuthenticationFilter {

    private final JwtTokenService jwtService;

    public FiltroAutenticacao(JwtTokenService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException {

        try {
            UsuarioLoginDTO dto = new ObjectMapper()
                    .readValue(request.getInputStream(), UsuarioLoginDTO.class);


            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(dto.apelido(), dto.senha());
            return getAuthenticationManager().authenticate(authToken);
        } catch (IOException e) {
            throw new AuthenticationServiceException("Erro ao ler o corpo da requisição", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        String username = authResult.getName();
        String token = jwtService.gerarToken(username, "access", 1);
        Cookie cookie = jwtService.gerarCookieRefreshToken(username);
        response.addCookie(cookie);

        response.addHeader("Authorization", "Bearer " + token);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Falha na autenticação: " + failed.getMessage());
    }
}
