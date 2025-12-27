package br.byjhona.folope.domain.salaMatch;

public record SalaEstadoDTO(
        String codigo,
        SalaStatus status,
        List<SalaJogadorDTO> jogadores
) {
}
