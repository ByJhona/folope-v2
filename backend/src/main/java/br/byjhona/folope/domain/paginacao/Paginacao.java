package br.byjhona.folope.domain.paginacao;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;
import java.util.Optional;

public record Paginacao<T>(
        @JsonInclude(JsonInclude.Include.NON_ABSENT)
        Optional<Long> id,
        Integer pagina,
        Integer quantPaginas,
        Integer quantResultados,
        List<T> resultados) {
}
