package br.byjhona.folope.controller;

import br.byjhona.folope.domain.parametro.ParametroDTO;
import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.domain.usuario.UsuarioDTO;
import br.byjhona.folope.exception.ObjetoNaoEncontradaException;
import br.byjhona.folope.service.UsuarioService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/usuario", produces = MediaType.APPLICATION_JSON_VALUE)
public class UsuarioController {
    private final UsuarioService usuarioServ;


    public UsuarioController(UsuarioService usuarioServ) {
        this.usuarioServ = usuarioServ;
    }

    @GetMapping
    public ResponseEntity<UsuarioDTO> obterUsuario(@AuthenticationPrincipal Jwt jwt, @ModelAttribute ParametroDTO parametrosDTO) {

        String nomeUsuario = jwt.getSubject();
        Usuario usuario = usuarioServ.obterUsuarioPorNome(nomeUsuario).orElseThrow(() -> new ObjetoNaoEncontradaException("Usuario nao encontrado."));
        UsuarioDTO dto = new UsuarioDTO(
                usuario.getUsername(),
                "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",      // avatar (placeholder)
                null,      // bio
                0,         // seguidores
                0,         // seguindo
                0          // pontuação
        );
        System.out.println(dto.nome());
        return ResponseEntity.ok().body(dto);
    }


}