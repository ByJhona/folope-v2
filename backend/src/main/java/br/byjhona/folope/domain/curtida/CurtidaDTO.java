package br.byjhona.folope.domain.curtida;

import java.time.Instant;

public record CurtidaDTO(Long id, Long idAlvo, AlvoCurtidaEnum alvo, Instant data) {
}
