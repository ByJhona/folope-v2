package br.byjhona.folope.domain.like;

import java.time.Instant;

public record CurtidaDTO(Long id, Long targetId, CurtidaEnum targetType, Instant timestramp) {
}
