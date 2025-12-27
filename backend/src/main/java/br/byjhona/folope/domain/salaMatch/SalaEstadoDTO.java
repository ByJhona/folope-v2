package br.byjhona.folope.domain.salaMatch;

import java.util.List;

public record SalaEstadoDTO(
        String codigo,
        SalaStatus status,
        List<SalaJogadorDTO> jogadores
) {
}
