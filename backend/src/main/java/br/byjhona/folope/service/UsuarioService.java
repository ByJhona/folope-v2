package br.byjhona.folope.service;

import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UsuarioRepository usuarioRepo;

    public UserService(UsuarioRepository usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    public Usuario obterUsuarioPorNome(){
        return usuarioRepo.
    }

}
