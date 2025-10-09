package br.byjhona.folope.controller;

import br.byjhona.folope.domain.usuario.Usuario;
import br.byjhona.folope.domain.usuario.UsuarioCadastroDTO;
import br.byjhona.folope.service.UsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("usuario")
public class UsuarioController {
    private final UsuarioService usuarioServ;

    public UsuarioController(UsuarioService usuarioServ) {
        this.usuarioServ = usuarioServ;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Usuario> cadastrar(@RequestBody UsuarioCadastroDTO dto) {
        Usuario usuario = usuarioServ.cadastrar(dto);
        return ResponseEntity.ok().body(usuario);
    }

    @PostMapping("/renovar-token")
    public ResponseEntity<HttpStatusCode> renovarToken(HttpServletRequest request) {
        String novoToken = usuarioServ.atualizarRefreshToken(request);

        return ResponseEntity.ok().header("Authorization", novoToken).build();
    }


}
