package br.byjhona.folope.domain.filme;

import java.util.List;


public record FilmeDescobertaResponse(
        Integer pagina,
        Integer quantPaginas,
        List<FilmeDescobertaDTO> filmes
) {
}
