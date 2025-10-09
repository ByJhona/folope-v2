package br.byjhona.folope.service;

import br.byjhona.folope.autenticacao.JwtTokenService;
import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.domain.usuario.UsuarioCadastroDTO;
import br.byjhona.folope.repository.UsuarioRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtServ;


    public UsuarioService(UsuarioRepository usuarioRepo, PasswordEncoder passwordEncoder, JwtTokenService jwtServ) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtServ = jwtServ;
    }

    public Usuario cadastrar(UsuarioCadastroDTO dto) {
        String senhaBcrypt = passwordEncoder.encode(dto.senha());
        Usuario usuario = new Usuario(dto.apelido(), senhaBcrypt);
        return usuarioRepo.save(usuario);
    }

    public String atualizarRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String refreshToken = null;

        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("refresh_token".equals(c.getName())) refreshToken = c.getValue();
            }
        }

        if (refreshToken != null && jwtServ.isTokenValido(refreshToken, "refresh")) {
            String username = jwtServ.obterUsuarioToken(refreshToken);
            return "Bearer " + jwtServ.gerarToken(username, "access", 15 * 60 * 1000);
        }
        throw new RuntimeException("Refresh token inválido");

    }

}
