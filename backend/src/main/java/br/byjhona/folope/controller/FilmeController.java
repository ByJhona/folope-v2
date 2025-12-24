package br.byjhona.folope.controller;

import br.byjhona.folope.domain.comentario.ComentarioDTO;
import br.byjhona.folope.domain.curtidaFilme.CurtidaFilme;
import br.byjhona.folope.domain.curtidaFilme.CurtidaFilmeDTO;
import br.byjhona.folope.domain.filme.FilmeDTO;
import br.byjhona.folope.domain.filme.FilmeResumoDTO;
import br.byjhona.folope.domain.imagemFilme.ImagemFilmeDTO;
import br.byjhona.folope.domain.paginacao.Paginacao;
import br.byjhona.folope.domain.parametro.ParametroDTO;
import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.service.FilmeService;
import br.byjhona.folope.service.TmdbAPI;
import br.byjhona.folope.util.Parametrizador;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "api/filmes", produces = MediaType.APPLICATION_JSON_VALUE)
public class FilmeController {
    private final TmdbAPI api;
    private final FilmeService filmeServ;

    public FilmeController(TmdbAPI api, FilmeService filmeServ) {
        this.api = api;
        this.filmeServ = filmeServ;
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
        CurtidaFilme curtida = filmeServ.salvarCurtidaBD(id, nomeUsuario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(curtida.getId()).toUri();
        System.out.println(curtida.getCriado());
        return ResponseEntity.created(uri).body(curtida);
    }

    @GetMapping("/{id}/curtir")
    public ResponseEntity<CurtidaFilme> obterCurtidaFilme(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        String nomeUsuario = jwt.getSubject();
        CurtidaFilme curtida = filmeServ.obterCurtida(id, nomeUsuario);
        return ResponseEntity.ok().body(curtida);
    }

    @GetMapping("/{id}/curtir/status")
    public ResponseEntity<Boolean> verificarExistenciaCurtidaFilme(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        if(jwt == null){
            System.out.println("Sem token");
            return ResponseEntity.ok(false);
        }
        boolean existe = filmeServ.verificarExistenciaCurtida(id, jwt.getSubject());
        return ResponseEntity.ok(existe);
    }

    @GetMapping("/id/{id}/comentarios")
    public ResponseEntity<Paginacao<ComentarioDTO>> mostrarComentariosFilmeId(@ModelAttribute ParametroDTO parametrosDTO, @PathVariable Long id) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        Paginacao<ComentarioDTO> comentarios = api.buscarComentariosFilme(parametros, id);
        return ResponseEntity.ok().body(comentarios);
    }

    @GetMapping("/id/{id}/imagens")
    public ResponseEntity<List<ImagemFilmeDTO>> mostrarImagensFilmeId(@ModelAttribute ParametroDTO parametrosDTO, @PathVariable Long id) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        List<ImagemFilmeDTO> imagensDTO = api.buscarImagensFilme(parametros, id);
        return ResponseEntity.ok().body(imagensDTO);
    }


}