package br.byjhona.folope.controller;

import br.byjhona.folope.domain.like.LikeDTO;
import br.byjhona.folope.domain.like.LikeTargetEnum;
import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(path = "api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    private final UserService userServ;

    public UserController(UserService userServ) {
        this.userServ = userServ;
    }

    @PostMapping
    public ResponseEntity<LikeDTO> like(@RequestBody LikeDTO likeDTO, Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        LikeDTO curtida = this.userServ.saveLike(likeDTO, usuario.getId());
        // TODO Arrumar a uri para que ela represente um endereço real
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(curtida.id()).toUri();
        return ResponseEntity.created(uri).body(curtida);
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteLike(@RequestParam Long idAlvo, @RequestParam LikeTargetEnum alvo, Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        this.userServ.deleteLike(usuario.getId(), idAlvo, alvo);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<LikeDTO> findLike(@RequestParam Long idAlvo, @RequestParam LikeTargetEnum alvo, Authentication authentication) {
        Usuario usuario = (Usuario) authentication.getPrincipal();
        LikeDTO likeDTO = this.userServ.findLike(usuario.getId(), idAlvo, alvo);
        return ResponseEntity.ok().body(likeDTO);
    }


}