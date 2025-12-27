package br.byjhona.folope.service;

import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SalaService {
    private final UsuarioRepository usuarioRepo;

    public SalaService(UsuarioRepository usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    public Optional<Usuario> obterUsuarioPorNome(String nomeUsuario) {
        return usuarioRepo.getUsuarioByNome(nomeUsuario);
    }

}
