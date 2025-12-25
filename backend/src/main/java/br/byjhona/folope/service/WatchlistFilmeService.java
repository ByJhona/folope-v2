package br.byjhona.folope.service;

import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.domain.watchlistFilme.WatchlistFilme;
import br.byjhona.folope.exception.ObjetoDuplicadoException;
import br.byjhona.folope.exception.ObjetoNaoEncontradaException;
import br.byjhona.folope.repository.WatchlistFilmeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class WatchlistFilmeService {
    private final WatchlistFilmeRepository watchlistFilmeRepo;
    private final UsuarioService usuarioServ;

    public WatchlistFilmeService(WatchlistFilmeRepository watchlistFilmeRepo, UsuarioService usuarioServ) {
        this.watchlistFilmeRepo = watchlistFilmeRepo;
        this.usuarioServ = usuarioServ;
    }

    @Transactional
    public WatchlistFilme salvar(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        boolean existe = watchlistFilmeRepo.existsByUsuarioIdAndFilmeId(usuario.getId(), idFilme);

        if (existe) {
            throw new ObjetoDuplicadoException("Filme ja adicionado a watchlist.");
        }
        WatchlistFilme watchlistFilme = new WatchlistFilme(usuario.getId(), idFilme);
        return watchlistFilmeRepo.save(watchlistFilme);
    }

    @Transactional
    public WatchlistFilme deletar(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        return watchlistFilmeRepo.deleteByUsuarioIdAndFilmeId(usuario.getId(), idFilme).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Filme nao esta na watchlist."));
    }

    @Transactional
    public WatchlistFilme obter(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));

        return watchlistFilmeRepo.findByUsuarioIdAndFilmeId(usuario.getId(), idFilme).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Filme nao encontrado."));
    }

    @Transactional
    public boolean verificarExistencia(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        return watchlistFilmeRepo.existsByUsuarioIdAndFilmeId(usuario.getId(), idFilme);
    }
}
