package br.byjhona.folope.controller;

import br.byjhona.folope.domain.salaMatch.SalaDTO;
import br.byjhona.folope.service.SalaService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/sala", produces = MediaType.APPLICATION_JSON_VALUE)
public class SalaMatchController {
    private final SalaService salaServ;

    public SalaMatchController(SalaService salaServ) {
        this.salaServ = salaServ;
    }

    @GetMapping("/criar")
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

    @GetMapping("/{codigo}/entrar")
    public ResponseEntity<SalaDTO> entrarSala(@AuthenticationPrincipal Jwt jwt, @PathVariable String codigo) {

        SalaDTO dto = salaServ.obterSala(codigo);
        return ResponseEntity.ok().body(dto);
    }
}