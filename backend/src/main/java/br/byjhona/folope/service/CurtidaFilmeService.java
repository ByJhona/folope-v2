package br.byjhona.folope.service;

import br.byjhona.folope.domain.curtidaFilme.CurtidaFilme;
import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.exception.ObjetoDuplicadoException;
import br.byjhona.folope.exception.ObjetoNaoEncontradaException;
import br.byjhona.folope.repository.CurtidaFilmeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CurtidaFilmeService {
    private final CurtidaFilmeRepository curtidaFilmeRepo;
    private final UsuarioService usuarioServ;

    public CurtidaFilmeService(CurtidaFilmeRepository curtidaFilmeRepo, UsuarioService usuarioServ) {
        this.curtidaFilmeRepo = curtidaFilmeRepo;
        this.usuarioServ = usuarioServ;
    }

    @Transactional
    public CurtidaFilme salvar(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() -> new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        boolean existe = curtidaFilmeRepo.existsByUsuarioIdAndFilmeId(usuario.getId(), idFilme);

        if (existe) {
            throw new ObjetoDuplicadoException("Filme já curtido.");
        }
        CurtidaFilme curtidaFilme = new CurtidaFilme(usuario.getId(),idFilme);
        return curtidaFilmeRepo.save(curtidaFilme);
    }

    @Transactional
    public CurtidaFilme deletar(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() -> new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        return curtidaFilmeRepo.deleteByUsuarioIdAndFilmeId(usuario.getId(), idFilme).orElseThrow(() -> new ObjetoNaoEncontradaException("Curtida nao encontrada."));
    }

    @Transactional
    public CurtidaFilme obter(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() -> new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));

        return curtidaFilmeRepo.findByUsuarioIdAndFilmeId(usuario.getId(), idFilme).orElseThrow(() ->
            new ObjetoNaoEncontradaException("Curtida nao encontrada."));
    }

    @Transactional
    public boolean verificarExistencia(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() -> new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        return curtidaFilmeRepo.existsByUsuarioIdAndFilmeId(usuario.getId(), idFilme);
    }
}
