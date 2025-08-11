package br.byjhona.folope.domain.filme;

import br.byjhona.folope.domain.genero.Genero;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
public record FilmeDTO(
        @JsonAlias("id")
        Long id,
        @JsonAlias("title")
        String titulo,
        @JsonAlias("backdrop_path")
        String urlCapaFundo,
        @JsonAlias("poster_path")
        String urlCapaPoster,
        @JsonAlias("genres")
        List<Genero> generos,
        @JsonAlias("overview")
        String sinopse,
        @JsonAlias("release_date")
        String dataLancamento,
        @JsonAlias("runtime")
        int duracao,
        @JsonAlias("vote_average")
        float nota
) {

    public FilmeDTO(
            Long id,
            String titulo,
            String urlCapaFundo,
            String urlCapaPoster,
            List<Genero> generos,
            String sinopse,
            String dataLancamento,
            int duracao,
            float nota
    ) {
        this.id = id;
        this.titulo = titulo;
        this.urlCapaFundo = "https://image.tmdb.org/t/p/original" + urlCapaFundo;
        this.urlCapaPoster = "https://image.tmdb.org/t/p/original" + urlCapaPoster;
        this.generos = generos;
        this.sinopse = sinopse;
        this.dataLancamento = dataLancamento;
        this.duracao = duracao;
        this.nota = nota;
    }
}
