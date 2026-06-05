package br.byjhona.folope.domain.salaMatch;

public record SalaDTO(
        String codigo,
        String nome,
        SalaStatus status,
        boolean ativa
) {
}
