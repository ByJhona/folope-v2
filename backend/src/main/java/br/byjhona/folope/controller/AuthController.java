package br.byjhona.folope.controller;

import br.byjhona.folope.domain.usuario.UsuarioCadastroDTO;
import br.byjhona.folope.service.AuthService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("auth")
public class AuthController {
    private final AuthService autenticacaoServ;

    public AuthController(AuthService autenticacaoServ) {
        this.autenticacaoServ = autenticacaoServ;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/signup")
    public String signup(@RequestParam String nomeUsuario,
                         @RequestParam String senha,
                         @RequestParam String senhaConfirmada,
                         Model model) {

        if (!senha.equals(senhaConfirmada)) {
            model.addAttribute("mostrarCadastro", true);
            model.addAttribute("nomeUsuario", nomeUsuario);
            model.addAttribute("msgError", "As senhas não coincidem!");
            return "login";
        }

        try {
            UsuarioCadastroDTO dto = new UsuarioCadastroDTO(nomeUsuario, senha);
            autenticacaoServ.signup(dto);
            model.addAttribute("msgSuccess", "Cadastro realizado! Faça login.");
        } catch (Exception e) {
            model.addAttribute("nomeUsuario", nomeUsuario);
            model.addAttribute("msgError", "Erro: " + e.getMessage());
        }

        return "login";
    }

}