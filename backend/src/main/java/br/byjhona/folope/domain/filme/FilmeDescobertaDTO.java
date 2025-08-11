package br.byjhona.folope.domain.filme;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record FilmeDescobertaDTO(
        @JsonAlias("id")
        Long id,
        @JsonAlias("title")
        String titulo,
        @JsonAlias("backdrop_path")
        String urlCapaFundo,
        @JsonAlias("poster_path")
        String urlCapaPoster,
        @JsonAlias("genre_ids")
        int[] idGeneros,
        @JsonAlias("overview")
        String sinopse,
        @JsonAlias("release_date")
        String dataLancamento,
        @JsonAlias("vote_average")
        float nota
) {
    public FilmeDescobertaDTO(
            Long id,
            String titulo,
            String urlCapaFundo,
            String urlCapaPoster,
            int[] idGeneros,
            String sinopse,
            String dataLancamento,
            float nota
    ) {
        this.id = id;
        this.titulo = titulo;
        this.urlCapaFundo = "https://image.tmdb.org/t/p/w500" + urlCapaFundo;
        this.urlCapaPoster = "https://image.tmdb.org/t/p/w500" + urlCapaPoster;
        this.idGeneros = idGeneros;
        this.sinopse = sinopse;
        this.dataLancamento = dataLancamento;
        this.nota = nota;
    }
}
