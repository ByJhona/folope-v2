package br.byjhona.folope.domain.imagemFilme;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ImagemFilmeDTO(@JsonAlias("height") Integer altura,
                             @JsonAlias("file_path") String url,
                             @JsonAlias("width") Integer largura) {
    public ImagemFilmeDTO(Integer altura, String url, Integer largura) {
        this.altura = altura;
        this.url = "https://image.tmdb.org/t/p/original" + url;
        this.largura = largura;

    }

}
