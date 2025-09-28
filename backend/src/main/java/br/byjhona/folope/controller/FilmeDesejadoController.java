package br.byjhona.folope.controller;

import br.byjhona.folope.domain.filmeDesejado.FilmeDesejadoDTO;
import br.byjhona.folope.service.FilmeDesejadoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "desejos", produces = MediaType.APPLICATION_JSON_VALUE)
public class FilmeDesejadoController {
    private final FilmeDesejadoService filmeDesejadoServ;

    public FilmeDesejadoController(FilmeDesejadoService filmeDesejadoServ) {
        this.filmeDesejadoServ = filmeDesejadoServ;
    }

    @PostMapping
    public ResponseEntity<FilmeDesejadoDTO> adicionarWatchList(@RequestBody FilmeDesejadoDTO dto, @AuthenticationPrincipal Jwt jwt) {
        String idUsuario = jwt.getSubject();
        FilmeDesejadoDTO filmeDesejadoDTO = this.filmeDesejadoServ.salvarFilmeDesejadoBD(dto, idUsuario);
        return ResponseEntity.ok().body(filmeDesejadoDTO);
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> removerWatchList(@RequestParam Long idFilme, @AuthenticationPrincipal Jwt jwt) {
        String idUsuario = jwt.getSubject();
        this.filmeDesejadoServ.deletarFilmeDesejadoBD(idUsuario, idFilme);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<FilmeDesejadoDTO> buscarFilmeDesejado(@RequestParam Long idFilme, @AuthenticationPrincipal Jwt jwt) {
        String idUsuario = jwt.getSubject();
        FilmeDesejadoDTO filmeDesejadoDTO = this.filmeDesejadoServ.buscarFilmeDesejadoBD(idUsuario, idFilme);
        return ResponseEntity.ok().body(filmeDesejadoDTO);
    }

    @GetMapping("/existe")
    public ResponseEntity<Boolean> buscarExistenciaFilmeDesejado(@RequestParam Long idFilme, @AuthenticationPrincipal Jwt jwt) {
        String idUsuario = jwt.getSubject();
        Boolean existe = this.filmeDesejadoServ.buscarExistenciaFilmeDesejadoBD(idUsuario, idFilme);
        return ResponseEntity.ok().body(existe);
    }
}