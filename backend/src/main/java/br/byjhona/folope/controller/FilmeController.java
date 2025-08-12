package br.byjhona.folope.controller;

import br.byjhona.folope.domain.filme.FilmeResumoDTO;
import br.byjhona.folope.domain.paginacao.Paginacao;
import br.byjhona.folope.domain.parametro.ParametroDTO;
import br.byjhona.folope.service.TmdbAPI;
import br.byjhona.folope.util.Parametrizador;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "filme", produces = MediaType.APPLICATION_JSON_VALUE)
public class FilmeController {
    private final TmdbAPI api;

    public FilmeController(TmdbAPI api) {
        this.api = api;
    }

    @GetMapping("/buscar/descoberta")
    public ResponseEntity<Paginacao<FilmeResumoDTO>> listarFilmesDescoberta(@ModelAttribute ParametroDTO parametroDTO) {
        String parametros = Parametrizador.tratar(parametroDTO);
        Paginacao<FilmeResumoDTO> filmes = api.buscarFilmesDescoberta(parametros);
        return ResponseEntity.ok().body(filmes);
    }

    @GetMapping("/buscar/popular")
    public ResponseEntity<Paginacao<FilmeResumoDTO>> listarFilmesPopulares(@ModelAttribute ParametroDTO parametroDTO) {
        String parametros = Parametrizador.tratar(parametroDTO);
        Paginacao<FilmeResumoDTO> filmes = api.buscarFilmesPopulares(parametros);
        return ResponseEntity.ok().body(filmes);
    }
}