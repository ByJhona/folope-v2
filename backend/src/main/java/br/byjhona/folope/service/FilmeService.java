package br.byjhona.folope.service;

import br.byjhona.folope.domain.curtidaFilme.CurtidaFilme;
import br.byjhona.folope.domain.curtidaFilme.CurtidaFilmeDTO;
import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.exception.ObjetoDuplicadoException;
import br.byjhona.folope.exception.ObjetoNaoEncontradaException;
import br.byjhona.folope.repository.CurtidaFilmeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class FilmeService {
    private final CurtidaFilmeRepository curtidaFilmeRepo;
    private final UsuarioService usuarioServ;

    public FilmeService(CurtidaFilmeRepository curtidaFilmeRepo, UsuarioService usuarioServ) {
        this.curtidaFilmeRepo = curtidaFilmeRepo;
        this.usuarioServ = usuarioServ;
    }

    @Transactional
    public CurtidaFilme salvarCurtidaBD(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() -> new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        boolean existe = curtidaFilmeRepo.existsByUsuarioIdAndFilmeId(usuario.getId(), idFilme);

        if (existe) {
            throw new ObjetoDuplicadoException("Filme já curtido.");
        }
        CurtidaFilme curtidaFilme = new CurtidaFilme(usuario.getId(),idFilme);
        return curtidaFilmeRepo.save(curtidaFilme);
    }

    @Transactional
    public void deletarCurtidaBD(Long idUsuario, Long idFilme) {
        boolean existe = curtidaFilmeRepo.existsByUsuarioIdAndFilmeId(idUsuario, idFilme);

        if (!existe) {
            throw new ObjetoNaoEncontradaException("O filme não está na watchlist.");
        }
        this.curtidaFilmeRepo.existsByUsuarioIdAndFilmeId(idUsuario, idFilme);
    }

    @Transactional
    public CurtidaFilme obterCurtida(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() -> new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));

        return curtidaFilmeRepo.findByUsuarioIdAndFilmeId(usuario.getId(), idFilme).orElseThrow(() ->
            new ObjetoNaoEncontradaException("Curtida nao encontrada."));
    }

    @Transactional
    public boolean verificarExistenciaCurtida(Long idFilme, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() -> new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        return curtidaFilmeRepo.existsByUsuarioIdAndFilmeId(usuario.getId(), idFilme);
    }

    public CurtidaFilmeDTO converterCurtidaFilmeParaDTO(CurtidaFilme curtida){
        return new CurtidaFilmeDTO(curtida.getFilmeId(), curtida.getUsuarioId(), curtida.getCriado());
    }
}
