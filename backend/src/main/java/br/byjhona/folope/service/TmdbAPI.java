package br.byjhona.folope.service;

import br.byjhona.folope.domain.filme.FilmeDescobertaDTO;
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

    public List<FilmeDescobertaDTO> buscarFilmesDescoberta() {
        String filmesString = client.get()
                .uri("/discover/movie")
                .retrieve()
                .bodyToMono(String.class)
                .block();
        try {
            JsonNode raiz = json.readTree(filmesString);
            JsonNode resultadosArray = raiz.path("results");
            return json.readValue(resultadosArray.traverse(), new TypeReference<List<FilmeDescobertaDTO>>() {
            });
        } catch (IOException ignored) {
        }
        return null;
    }


}
