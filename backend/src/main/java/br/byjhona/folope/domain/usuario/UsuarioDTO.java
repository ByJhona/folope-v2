package br.byjhona.folope.domain.usuario;

public record UsuarioDTO(
        String nome,
        String avatar,
        String bio,
        int seguidores,
        int seguindo,
        int pontuacao
) {
}

