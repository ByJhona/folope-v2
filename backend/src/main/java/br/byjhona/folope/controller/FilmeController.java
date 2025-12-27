package br.byjhona.folope.controller;

import br.byjhona.folope.domain.curtidaFilme.CurtidaFilme;
import br.byjhona.folope.domain.filme.FilmeDTO;
import br.byjhona.folope.domain.filme.FilmeResumoDTO;
import br.byjhona.folope.domain.imagemFilme.ImagemFilmeDTO;
import br.byjhona.folope.domain.paginacao.Paginacao;
import br.byjhona.folope.domain.parametro.ParametroDTO;
import br.byjhona.folope.domain.watchlistFilme.WatchlistFilme;
import br.byjhona.folope.service.CurtidaFilmeService;
import br.byjhona.folope.service.TmdbAPI;
import br.byjhona.folope.service.WatchlistFilmeService;
import br.byjhona.folope.util.Parametrizador;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "api/filmes", produces = MediaType.APPLICATION_JSON_VALUE)
public class FilmeController {
    private final TmdbAPI api;
    private final CurtidaFilmeService curtidaFilmeServ;
    private final WatchlistFilmeService watchlistFilmeServ;

    public FilmeController(TmdbAPI api, CurtidaFilmeService curtidaFilmeServ, WatchlistFilmeService watchlistFilmeServ) {
        this.api = api;
        this.curtidaFilmeServ = curtidaFilmeServ;
        this.watchlistFilmeServ = watchlistFilmeServ;
    }

    @GetMapping("/descoberta")
    public ResponseEntity<Paginacao<FilmeResumoDTO>> listarFilmesDescoberta(@ModelAttribute ParametroDTO parametrosDTO) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        Paginacao<FilmeResumoDTO> filmes = api.buscarFilmesDescoberta(parametros);
        return ResponseEntity.ok().body(filmes);
    }

    @GetMapping("/populares")
    public ResponseEntity<Paginacao<FilmeResumoDTO>> listarFilmesPopulares(@ModelAttribute ParametroDTO parametrosDTO) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        Paginacao<FilmeResumoDTO> filmes = api.buscarFilmesPopulares(parametros);
        return ResponseEntity.ok().body(filmes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FilmeDTO> mostrarFilmeId(@ModelAttribute ParametroDTO parametrosDTO, @PathVariable Long id) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        FilmeDTO filme = api.buscarFilmeId(parametros, id);
        return ResponseEntity.ok().body(filme);
    }

    @PostMapping("/{id}/curtir")
    public ResponseEntity<CurtidaFilme> curtirFilme(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        String nomeUsuario = jwt.getSubject();
        CurtidaFilme curtida = curtidaFilmeServ.salvar(id, nomeUsuario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(curtida.getId()).toUri();
        return ResponseEntity.created(uri).body(curtida);
    }

    @GetMapping("/{id}/curtir")
    public ResponseEntity<CurtidaFilme> obterCurtidaFilme(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        String nomeUsuario = jwt.getSubject();
        CurtidaFilme curtida = curtidaFilmeServ.obter(id, nomeUsuario);
        return ResponseEntity.ok().body(curtida);
    }

    @DeleteMapping("/{id}/curtir")
    public ResponseEntity<CurtidaFilme> deletarCurtidaFilme(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        String nomeUsuario = jwt.getSubject();
        CurtidaFilme curtida = curtidaFilmeServ.deletar(id, nomeUsuario);
        return ResponseEntity.ok().body(curtida);
    }

    @GetMapping("/{id}/curtir/status")
    public ResponseEntity<Boolean> verificarExistenciaCurtidaFilme(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        if (jwt == null) return ResponseEntity.ok(false);

        boolean existe = curtidaFilmeServ.verificarExistencia(id, jwt.getSubject());
        return ResponseEntity.ok(existe);
    }

    @GetMapping("/{id}/curtir/quantidade")
    public ResponseEntity<Long> contarCurtidasFilme(@PathVariable Long id) {
        Long quantidade = curtidaFilmeServ.contarQuantidade(id);
        return ResponseEntity.ok(quantidade);
    }

    @PostMapping("/{id}/watchlist")
    public ResponseEntity<WatchlistFilme> watchlistFilme(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        String nomeUsuario = jwt.getSubject();
        WatchlistFilme watchlistFilme = watchlistFilmeServ.salvar(id, nomeUsuario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(watchlistFilme.getId()).toUri();
        return ResponseEntity.created(uri).body(watchlistFilme);

    }

    @DeleteMapping("/{id}/watchlist")
    public ResponseEntity<WatchlistFilme> deletarWatchlistFilme(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        String nomeUsuario = jwt.getSubject();
        WatchlistFilme watchlistFilme = watchlistFilmeServ.deletar(id, nomeUsuario);
        return ResponseEntity.ok().body(watchlistFilme);
    }

    @GetMapping("/{id}/watchlist/status")
    public ResponseEntity<Boolean> verificarExistenciaWatchlistFilme(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        if (jwt == null) return ResponseEntity.ok(false);

        boolean existe = watchlistFilmeServ.verificarExistencia(id, jwt.getSubject());
        return ResponseEntity.ok(existe);
    }

    @GetMapping("/id/{id}/imagens")
    public ResponseEntity<List<ImagemFilmeDTO>> mostrarImagensFilmeId(@ModelAttribute ParametroDTO parametrosDTO, @PathVariable Long id) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        List<ImagemFilmeDTO> imagensDTO = api.buscarImagensFilme(parametros, id);
        return ResponseEntity.ok().body(imagensDTO);
    }

}