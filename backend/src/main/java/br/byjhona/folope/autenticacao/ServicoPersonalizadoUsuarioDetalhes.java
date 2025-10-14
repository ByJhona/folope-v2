package br.byjhona.folope.autenticacao;

import br.byjhona.folope.repository.AutenticacaoRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ServicoPersonalizadoUsuarioDetalhes implements UserDetailsService {
    private final AutenticacaoRepository usuarioRepo;

    public ServicoPersonalizadoUsuarioDetalhes(AutenticacaoRepository usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String nomeUsuario) throws UsernameNotFoundException {
        return usuarioRepo.findByNomeUsuario(nomeUsuario).orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }
}
