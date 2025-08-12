package br.byjhona.folope.service;

import br.byjhona.folope.domain.filme.FilmeResumoDTO;
import br.byjhona.folope.domain.paginacao.Paginacao;
import br.byjhona.folope.properties.TmdbApiProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.List;

@Service
public class TmdbAPI {
    private final WebClient client;
    private final TmdbApiProperties properties;
    private final ObjectMapper json;

    public TmdbAPI(WebClient.Builder builder, TmdbApiProperties properties, ObjectMapper json) {
        this.json = json;
        this.properties = properties;
        this.client = builder
                .baseUrl(properties.getUri())
                .defaultHeaders(httpHeaders -> {
                    httpHeaders.add("accept", "application/json");
                    httpHeaders.add("Authorization", "Bearer " + properties.getToken());
                })
                .build();
    }

    public Paginacao<FilmeResumoDTO> buscarFilmesDescoberta(String parametros) {
        String filmesString = client.get()
                .uri("/discover/movie")
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return extrairFilmesResumo(filmesString);
    }

    public Paginacao<FilmeResumoDTO> buscarFilmesPopulares(String parametros) {
        String filmesString = client.get()
                .uri("/movie/popular")
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return extrairFilmesResumo(filmesString);
    }

    private Paginacao<FilmeResumoDTO> extrairFilmesResumo(String filmesString) {
        try {
            JsonNode raiz = json.readTree(filmesString);
            JsonNode resultadosArray = raiz.path("results");
            JsonNode pageNode = raiz.path("page");
            JsonNode totalPagesNode = raiz.path("total_pages");
            JsonNode totalResultsNode = raiz.path("total_results");

            Integer pagina = extrairNumeroNo(pageNode);
            Integer totalPaginas = extrairNumeroNo(totalPagesNode);
            Integer totalResultados = extrairNumeroNo(totalResultsNode);
            List<FilmeResumoDTO> filmesDTO = json.readValue(resultadosArray.traverse(), new TypeReference<List<FilmeResumoDTO>>() {
            });
            return new Paginacao<>(pagina, totalPaginas, totalResultados, filmesDTO);
        } catch (IOException ignored) {
            throw new RuntimeException();
        }
    }

    private Integer extrairNumeroNo(JsonNode node) {
        return node.isNumber() ? node.asInt() : null;
    }
}
