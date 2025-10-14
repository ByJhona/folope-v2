package br.byjhona.folope.controller;

import br.byjhona.folope.domain.usuario.UsuarioCadastroDTO;
import br.byjhona.folope.domain.usuario.UsuarioDTO;
import br.byjhona.folope.service.AutenticacaoService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "autenticacao", produces = MediaType.APPLICATION_JSON_VALUE)
public class AutenticacaoController {
    private final AutenticacaoService authServ;

    public AutenticacaoController(AutenticacaoService authServ) {
        this.authServ = authServ;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioDTO> cadastrar(@RequestBody UsuarioCadastroDTO dto) {
        UsuarioDTO usuarioCadastrado = authServ.cadastrar(dto);
        return ResponseEntity.ok().body(usuarioCadastrado);
    }
}