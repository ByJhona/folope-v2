package br.byjhona.folope.service;

import br.byjhona.folope.domain.salaMatch.*;
import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.exception.ObjetoNaoEncontradaException;
import br.byjhona.folope.repository.SalaJogadorRepository;
import br.byjhona.folope.repository.SalaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class SalaService {
    private final UsuarioService usuarioServ;
    private final SalaRepository salaRepo;
    private final SalaJogadorRepository salaJogadorRepo;

    public SalaService(UsuarioService usuarioServ, SalaRepository salaRepo, SalaJogadorRepository salaJogadorRepo) {
        this.usuarioServ = usuarioServ;
        this.salaRepo = salaRepo;
        this.salaJogadorRepo = salaJogadorRepo;
    }

    @Transactional
    public SalaDTO criar(String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        Sala sala = new Sala(usuario.getId());
        Sala salva = salaRepo.save(sala);

        SalaJogador dono = new SalaJogador(
                null,
                sala.getId(),
                usuario.getId(),
                SalaRegra.DONO,
                true,
                Instant.now(),
                null
        );

        salaJogadorRepo.save(dono);

        return new SalaDTO(salva.getCodigo(), sala.getNome(), salva.getStatus(), sala.isAtiva());
    }

    public SalaDTO obterSala(String codigo) {
        Sala sala = salaRepo.findByCodigo(codigo).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Sala nao encontrada: %s", codigo));
        return new SalaDTO(sala.getCodigo(), sala.getNome(), sala.getStatus(), sala.isAtiva());
    }

    @Transactional
    public SalaDTO entrarNaSala(String codigo, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));

        Sala sala = salaRepo.findByCodigo(codigo)
                .orElseThrow(() -> new ObjetoNaoEncontradaException("Sala não encontrada"));

        if (sala.getStatus() != SalaStatus.LOBBY) {
            throw new RuntimeException("Sala já iniciada");
        }

        long ativos = salaJogadorRepo.countBySalaIdAndSaiuIsNull(sala.getId());
        if (ativos >= 2) {
            throw new RuntimeException("Sala cheia");
        }

        boolean jaExiste = salaJogadorRepo
                .findBySalaIdAndUsuarioId(sala.getId(), usuario.getId())
                .isPresent();

        if (jaExiste) throw new RuntimeException("Jogador ja esta na sala.");

        SalaJogador convidado = new SalaJogador(
                null,
                sala.getId(),
                usuario.getId(),
                SalaRegra.CONVIDADO,
                true,
                Instant.now(),
                null
        );

        salaJogadorRepo.save(convidado);
        return new SalaDTO(sala.getCodigo(), sala.getNome(), sala.getStatus(), sala.isAtiva());
    }

    @Transactional
    public SalaEstadoDTO buscarEstado(String codigo) {

        Sala sala = salaRepo.findByCodigo(codigo)
                .orElseThrow();

        List<SalaJogadorDTO> jogadores =
                salaJogadorRepo.findBySalaId(sala.getId())
                        .stream()
                        .filter(j -> j.getSaiu() == null)
                        .map(j -> new SalaJogadorDTO(
                                j.getUsuarioId(),
                                j.getRegra(),
                                j.isConectado()
                        ))
                        .toList();

        return new SalaEstadoDTO(
                sala.getCodigo(),
                sala.getStatus(),
                jogadores
        );
    }

    @Transactional
    public SalaDTO iniciarMatch(String codigo, String nomeUsuario) {
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() ->
                new ObjetoNaoEncontradaException("Usuario [%s] nao encontrado.", nomeUsuario));
        Sala sala = salaRepo.findByCodigo(codigo)
                .orElseThrow();

        SalaJogador jogador = salaJogadorRepo
                .findBySalaIdAndUsuarioId(sala.getId(), usuario.getId())
                .orElseThrow();

        if (jogador.getRegra() != SalaRegra.DONO) {
            throw new RuntimeException("Apenas o dono pode iniciar");
        }

        long ativos = salaJogadorRepo.countBySalaIdAndSaiuIsNull(sala.getId());
        if (ativos < 2) {
            throw new RuntimeException("Jogadores insuficientes");
        }

        sala.setStatus(SalaStatus.MATCHING);
        Sala salva = salaRepo.save(sala);
        return new SalaDTO(salva.getCodigo(), salva.getNome(), salva.getStatus(), salva.isAtiva());
    }


}
