package br.byjhona.folope.controller;

import br.byjhona.folope.domain.curtida.AlvoCurtidaEnum;
import br.byjhona.folope.domain.curtida.CurtidaDTO;
import br.byjhona.folope.service.CurtidaService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(path = "curtidas", produces = MediaType.APPLICATION_JSON_VALUE)
public class CurtidaController {
    private final CurtidaService curtidaServ;

    public CurtidaController(CurtidaService curtidaServ) {
        this.curtidaServ = curtidaServ;
    }

    @PostMapping
    public ResponseEntity<CurtidaDTO> curtir(@RequestBody CurtidaDTO curtidaDTO, @AuthenticationPrincipal Jwt jwt) {
        String idUsuario = jwt.getSubject();
        CurtidaDTO curtida = this.curtidaServ.salvarCurtidaBD(curtidaDTO, idUsuario);
        // TODO Arrumar a uri para que ela represente um endereço real
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(curtida.id()).toUri();
        return ResponseEntity.created(uri).body(curtida);
    }

    @GetMapping
    public ResponseEntity<CurtidaDTO> buscarCurtida(@RequestParam Long idAlvo, @RequestParam AlvoCurtidaEnum alvo, @AuthenticationPrincipal Jwt jwt) {
        String idUsuario = jwt.getSubject();
        CurtidaDTO curtidaDTO = this.curtidaServ.buscarCurtidaBD(idUsuario, idAlvo, alvo);
        return ResponseEntity.ok().body(curtidaDTO);
    }

    @GetMapping("/existe")
    public ResponseEntity<Boolean> buscarExistenciaCurtida(@RequestParam Long idAlvo, @RequestParam AlvoCurtidaEnum alvo, @AuthenticationPrincipal Jwt jwt) {
        String idUsuario = jwt.getSubject();
        Boolean existe = this.curtidaServ.buscarExistenciaCurtidaBD(idUsuario, idAlvo, alvo);
        return ResponseEntity.ok().body(existe);
    }


}