package br.byjhona.folope.controller;

import br.byjhona.folope.domain.salaMatch.SalaDTO;
import br.byjhona.folope.domain.salaMatch.SalaEstadoDTO;
import br.byjhona.folope.service.SalaService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/sala", produces = MediaType.APPLICATION_JSON_VALUE)
public class SalaController {
    private final SalaService salaServ;

    public SalaController(SalaService salaServ) {
        this.salaServ = salaServ;
    }

    @PostMapping("/criar")
    public ResponseEntity<SalaDTO> criarSala(@AuthenticationPrincipal Jwt jwt) {
        String nomeUsuario = jwt.getSubject();
        SalaDTO dto = salaServ.criar(nomeUsuario);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<SalaDTO> obterSala(@PathVariable String codigo) {
        SalaDTO dto = salaServ.obterSala(codigo);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/{codigo}/entrar")
    public ResponseEntity<SalaDTO> entrarSala(@AuthenticationPrincipal Jwt jwt, @PathVariable String codigo) {
        String nomeUsuario = jwt.getSubject();
        SalaDTO dto = salaServ.entrarNaSala(codigo, nomeUsuario);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/{codigo}/estado")
    public ResponseEntity<SalaEstadoDTO> buscarEstado(@PathVariable String codigo) {
        SalaEstadoDTO dto = salaServ.buscarEstado(codigo);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/{codigo}/iniciar")
    public ResponseEntity<SalaDTO> iniciarSala(@AuthenticationPrincipal Jwt jwt, @PathVariable String codigo) {
        String nomeUsuario = jwt.getSubject();

        SalaDTO dto = salaServ.iniciarMatch(codigo, nomeUsuario);
        return ResponseEntity.ok().body(dto);
    }

}