package br.byjhona.folope.domain.like;

import java.time.Instant;

public record LikeDTO(Long id, Long targetId, LikeTargetEnum targetType, Instant timestramp) {
}
