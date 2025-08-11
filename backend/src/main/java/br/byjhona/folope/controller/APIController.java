package br.byjhona.folope.controller;

import br.byjhona.folope.domain.Mensagem;
import br.byjhona.folope.service.TmdbAPI;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class APIController {
    private final TmdbAPI api;

    public APIController(TmdbAPI api) {
        this.api = api;
    }

    @GetMapping(value = "/publico")
    public ResponseEntity<Mensagem> publicEndpoint() {
        Mensagem mensagem = new Mensagem("All good. You DO NOT need to be authenticated to call /api/public.");
        System.out.println(this.api.buscarFilmesDescoberta());
        return ResponseEntity.ok().body(mensagem);
    }

    @GetMapping(value = "/privado")
    public ResponseEntity<Mensagem> privateEndpoint() {
        Mensagem mensagem = new Mensagem("All good. You can see this because you are Authenticated.");
        return ResponseEntity.ok().body(mensagem);
    }

    @GetMapping(value = "/private-scoped")
    public ResponseEntity<Mensagem> privateScopedEndpoint() {
        Mensagem mensagem = new Mensagem("All good. You can see this because you are Authenticated with a Token granted the 'read:messages' scope");
        return ResponseEntity.ok().body(mensagem);
    }
}