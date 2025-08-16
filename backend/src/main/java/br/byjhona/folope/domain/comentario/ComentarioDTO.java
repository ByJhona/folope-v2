package br.byjhona.folope.domain.comentario;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.time.Instant;

public record ComentarioDTO(@JsonAlias("author") String autor,
                            @JsonAlias("author_details") ComentarioAutorDetalhesDTO detalhes_autor,
                            @JsonAlias("content") String comentario,
                            @JsonAlias("created_at") Instant criado,
                            @JsonAlias("id") String id,
                            @JsonAlias("updated_at") Instant atualizado) {
}
