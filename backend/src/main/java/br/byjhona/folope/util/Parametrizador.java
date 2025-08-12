package br.byjhona.folope.util;

import br.byjhona.folope.domain.parametro.ParametroDTO;
import br.byjhona.folope.properties.TmdbApiProperties;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

public class Parametrizador {
    TmdbApiProperties properties;

    public Parametrizador(TmdbApiProperties properties) {
        this.properties = properties;
    }

    public static String tratar(ParametroDTO parametros) {

        UriComponentsBuilder builder = UriComponentsBuilder.newInstance();

        Optional.ofNullable(parametros.sortear()).ifPresent(parametro -> builder.queryParam("sort_by", parametro));
        Optional.ofNullable(parametros.genero()).ifPresent(parametro -> builder.queryParam("with_genres", parametro));
        Optional.ofNullable(parametros.query()).ifPresent(parametro -> builder.queryParam("query", parametro));
        Optional.ofNullable(parametros.pagina()).ifPresent(parametro -> builder.queryParam("page", parametro));
        Optional.ofNullable(parametros.pagina()).ifPresent(parametro -> builder.queryParam("language", "pt-BR"));

        return builder.toUriString();
    }
}
