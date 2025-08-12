package br.byjhona.folope.domain.paginacao;

import java.util.List;

public record Paginacao<T>(Integer pagina,
                           Integer quantPaginas,
                           Integer quantResultados,
                           List<T> resultados) {
}
