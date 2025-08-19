package br.byjhona.folope.controller;

import br.byjhona.folope.domain.comentario.ComentarioDTO;
import br.byjhona.folope.domain.filme.FilmeDTO;
import br.byjhona.folope.domain.filme.FilmeResumoDTO;
import br.byjhona.folope.domain.imagemFilme.ImagemFilmeDTO;
import br.byjhona.folope.domain.paginacao.Paginacao;
import br.byjhona.folope.domain.parametro.ParametroDTO;
import br.byjhona.folope.service.TmdbAPI;
import br.byjhona.folope.util.Parametrizador;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "filme", produces = MediaType.APPLICATION_JSON_VALUE)
public class FilmeController {
    private final TmdbAPI api;

    public FilmeController(TmdbAPI api) {
        this.api = api;
    }

    @GetMapping("/descoberta")
    public ResponseEntity<Paginacao<FilmeResumoDTO>> listarFilmesDescoberta(@ModelAttribute ParametroDTO parametrosDTO) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        Paginacao<FilmeResumoDTO> filmes = api.buscarFilmesDescoberta(parametros);
        return ResponseEntity.ok().body(filmes);
    }

    @GetMapping("/popular")
    public ResponseEntity<Paginacao<FilmeResumoDTO>> listarFilmesPopulares(@ModelAttribute ParametroDTO parametrosDTO) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        Paginacao<FilmeResumoDTO> filmes = api.buscarFilmesPopulares(parametros);
        return ResponseEntity.ok().body(filmes);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<FilmeDTO> mostrarFilmeId(@ModelAttribute ParametroDTO parametrosDTO, @PathVariable Long id) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        FilmeDTO filme = api.buscarFilmeId(parametros, id);
        return ResponseEntity.ok().body(filme);
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