package br.byjhona.folope.domain.curtidaFilme;

import java.time.Instant;

public record CurtidaFilmeDTO(Long filmeId,  Long usuarioId,Instant timestramp) {
}
