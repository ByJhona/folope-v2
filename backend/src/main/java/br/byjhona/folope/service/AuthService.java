package br.byjhona.folope.service;

import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.domain.usuario.UsuarioCadastroDTO;
import br.byjhona.folope.domain.usuario.UsuarioDTO;
import br.byjhona.folope.repository.AuthRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthRepository authRepo;
    private final PasswordEncoder passwordEncoder;


    public AuthService(AuthRepository authRepo, PasswordEncoder passwordEncoder) {
        this.authRepo = authRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioDTO signup(UsuarioCadastroDTO dto) {
        String senhaBcrypt = passwordEncoder.encode(dto.senha());
        Usuario usuario = new Usuario(dto.nomeUsuario(), senhaBcrypt);
        Usuario usuarioCadastrado = authRepo.save(usuario);
        return new UsuarioDTO(usuarioCadastrado.getUsername());
    }
}
