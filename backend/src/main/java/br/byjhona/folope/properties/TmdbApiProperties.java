package br.byjhona.folope.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "folope.api.tmdb")
public class TmdbApiProperties {
    private String uri;
    private String token;
}
