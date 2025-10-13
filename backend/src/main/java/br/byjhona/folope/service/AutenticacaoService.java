package br.byjhona.folope.service;

import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.domain.usuario.UsuarioCadastroDTO;
import br.byjhona.folope.repository.AutenticacaoRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService {
    private final AutenticacaoRepository authRepo;
    private final PasswordEncoder passwordEncoder;


    public AutenticacaoService(AutenticacaoRepository authRepo, PasswordEncoder passwordEncoder) {
        this.authRepo = authRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario cadastrar(UsuarioCadastroDTO dto) {
        String senhaBcrypt = passwordEncoder.encode(dto.senha());
        Usuario usuario = new Usuario(dto.apelido(), senhaBcrypt);
        return authRepo.save(usuario);
    }
}
