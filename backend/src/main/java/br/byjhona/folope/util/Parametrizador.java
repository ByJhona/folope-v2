package br.byjhona.folope.util;

import br.byjhona.folope.domain.parametro.ParametroDTO;
import br.byjhona.folope.properties.TmdbApiProperties;
import org.springframework.web.util.UriComponentsBuilder;

public class Parametrizador {
    TmdbApiProperties properties;

    public Parametrizador(TmdbApiProperties properties) {
        this.properties = properties;
    }

    public static String tratar(ParametroDTO parametros) {

        UriComponentsBuilder builder = UriComponentsBuilder.newInstance();

        parametros.sortear()
                .filter(s -> !s.isBlank())
                .ifPresent(p -> builder.queryParam("sort_by", p));

        parametros.genero()
                .filter(s -> !s.isBlank())
                .ifPresent(p -> builder.queryParam("with_genres", p));

        parametros.query()
                .filter(s -> !s.isBlank())
                .ifPresent(p -> builder.queryParam("query", p));

        parametros.pagina()
                .ifPresent(p -> builder.queryParam("page", p));

        builder.queryParam("language", "pt-BR");

        return builder.toUriString();
    }
}
