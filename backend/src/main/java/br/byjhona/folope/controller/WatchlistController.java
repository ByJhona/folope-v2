package br.byjhona.folope.controller;

import br.byjhona.folope.domain.filmeDesejado.FilmeDesejadoDTO;
import br.byjhona.folope.service.FilmeDesejadoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/watchlist", produces = MediaType.APPLICATION_JSON_VALUE)
public class WatchlistController {
    private final FilmeDesejadoService filmeDesejadoServ;

    public WatchlistController(FilmeDesejadoService filmeDesejadoServ) {
        this.filmeDesejadoServ = filmeDesejadoServ;
    }

    @PostMapping
    public ResponseEntity<FilmeDesejadoDTO> adicionarWatchList(@RequestBody FilmeDesejadoDTO dto) {
        String idUsuario = "12345";
        FilmeDesejadoDTO filmeDesejadoDTO = this.filmeDesejadoServ.salvarFilmeDesejadoBD(dto, idUsuario);
        return ResponseEntity.ok().body(filmeDesejadoDTO);
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> removerWatchList(@RequestParam Long idFilme) {
        String idUsuario = "12345";
        this.filmeDesejadoServ.deletarFilmeDesejadoBD(idUsuario, idFilme);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<FilmeDesejadoDTO> buscarFilmeDesejado(@RequestParam Long idFilme) {
        String idUsuario = "12345";
        FilmeDesejadoDTO filmeDesejadoDTO = this.filmeDesejadoServ.buscarFilmeDesejadoBD(idUsuario, idFilme);
        return ResponseEntity.ok().body(filmeDesejadoDTO);
    }

    @GetMapping("/existe")
    public ResponseEntity<Boolean> buscarExistenciaFilmeDesejado(@RequestParam Long idFilme) {
        String idUsuario = "12345";
        Boolean existe = this.filmeDesejadoServ.buscarExistenciaFilmeDesejadoBD(idUsuario, idFilme);
        return ResponseEntity.ok().body(existe);
    }
}