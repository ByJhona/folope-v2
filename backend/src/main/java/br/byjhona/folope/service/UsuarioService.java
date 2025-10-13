package br.byjhona.folope.service;

import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.domain.usuario.UsuarioCadastroDTO;
import br.byjhona.folope.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;


    public UsuarioService(UsuarioRepository usuarioRepo, PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario cadastrar(UsuarioCadastroDTO dto) {
        String senhaBcrypt = passwordEncoder.encode(dto.senha());
        Usuario usuario = new Usuario(dto.apelido(), senhaBcrypt);
        return usuarioRepo.save(usuario);
    }
}
