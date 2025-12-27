package br.byjhona.folope.domain.salaMatch;

public record SalaJogadorDTO(
        Long usuarioId,
        SalaRegra regra,
        boolean conectado
) {
}

