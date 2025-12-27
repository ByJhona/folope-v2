package br.byjhona.folope.controller;

import br.byjhona.folope.domain.filme.FilmeResumoDTO;
import br.byjhona.folope.domain.paginacao.Paginacao;
import br.byjhona.folope.domain.parametro.ParametroDTO;
import br.byjhona.folope.service.CurtidaFilmeService;
import br.byjhona.folope.service.TmdbAPI;
import br.byjhona.folope.service.WatchlistFilmeService;
import br.byjhona.folope.util.Parametrizador;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/sala-match", produces = MediaType.APPLICATION_JSON_VALUE)
public class UsuarioController {
    private final TmdbAPI api;

    public UsuarioController(TmdbAPI api, CurtidaFilmeService curtidaFilmeServ, WatchlistFilmeService watchlistFilmeServ) {
        this.api = api;
    }

    @GetMapping("/filmes")
    public ResponseEntity<Paginacao<FilmeResumoDTO>> listarFilmesPopulares(@ModelAttribute ParametroDTO parametrosDTO) {
        String parametros = Parametrizador.tratar(parametrosDTO);
        Paginacao<FilmeResumoDTO> filmes = api.buscarFilmesPopulares(parametros);
        return ResponseEntity.ok().body(filmes);
    }


}