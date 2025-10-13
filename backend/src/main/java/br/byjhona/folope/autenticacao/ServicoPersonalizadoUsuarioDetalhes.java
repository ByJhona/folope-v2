package br.byjhona.folope.autenticacao;

import br.byjhona.folope.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ServicoPersonalizadoUsuarioDetalhes implements UserDetailsService {
    private final UsuarioRepository usuarioRepo;

    public ServicoPersonalizadoUsuarioDetalhes(UsuarioRepository usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String apelido) throws UsernameNotFoundException {
        return usuarioRepo.findByApelido(apelido).orElseThrow(() -> new UsernameNotFoundException("Usuario nao encontrado"));
    }
}
