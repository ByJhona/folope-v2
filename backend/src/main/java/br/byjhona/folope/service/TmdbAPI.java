package br.byjhona.folope.service;

import br.byjhona.folope.domain.comentario.ComentarioDTO;
import br.byjhona.folope.domain.filme.FilmeDTO;
import br.byjhona.folope.domain.filme.FilmeResumoDTO;
import br.byjhona.folope.domain.imagemFilme.ImagemFilmeDTO;
import br.byjhona.folope.domain.paginacao.Paginacao;
import br.byjhona.folope.properties.TmdbApiProperties;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class TmdbAPI {
    private final WebClient client;
    private final TmdbApiProperties propriedades;
    private final ObjectMapper json;

    public TmdbAPI(WebClient.Builder builder, TmdbApiProperties propriedades, ObjectMapper json) {
        this.json = json;
        this.propriedades = propriedades;
        this.client = builder
                .baseUrl(propriedades.getUri())
                .defaultHeaders(httpHeaders -> {
                    httpHeaders.add("accept", "application/json");
                    httpHeaders.add("Authorization", "Bearer " + propriedades.getToken());
                })
                .build();
    }

    public Paginacao<FilmeResumoDTO> buscarFilmesDescoberta(String parametros) {
        String filmesString = client.get()
                .uri("/discover/movie" + parametros)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return extrairFilmesResumo(filmesString);
    }

    public Paginacao<FilmeResumoDTO> buscarFilmesPopulares(String parametros) {
        String filmesString = client.get()
                .uri("/movie/popular" + parametros)
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

            Integer pagina = extrairNumeroIntegerNo(pageNode);
            Integer totalPaginas = extrairNumeroIntegerNo(totalPagesNode);
            Integer totalResultados = extrairNumeroIntegerNo(totalResultsNode);
            List<FilmeResumoDTO> filmesDTO = json.readValue(resultadosArray.traverse(), new TypeReference<List<FilmeResumoDTO>>() {
            });
            return new Paginacao<>(Optional.empty(), pagina, totalPaginas, totalResultados, filmesDTO);
        } catch (IOException ignored) {
            throw new RuntimeException();
        }
    }

    private Integer extrairNumeroIntegerNo(JsonNode node) {
        return node.isNumber() ? node.asInt() : null;
    }

    private Long extrairNumeroLongNo(JsonNode node) {
        return node.isNumber() ? node.asLong() : null;
    }


    public FilmeDTO buscarFilmeId(String parametros, Long id) {
        return client.get()
                .uri("/movie/" + id + parametros)
                .retrieve()
                .bodyToMono(FilmeDTO.class)
                .block();
    }

    public Paginacao<ComentarioDTO> buscarComentariosFilme(String parametros, Long id) {
        String comentariosString = client.get()
                .uri("/movie/" + id + "/reviews" + parametros)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return extrairComentariosFilme(comentariosString);
    }

    private Paginacao<ComentarioDTO> extrairComentariosFilme(String comentariosString) {
        try {
            System.out.println(comentariosString);
            JsonNode raiz = json.readTree(comentariosString);
            JsonNode resultadosArray = raiz.path("results");
            JsonNode idNode = raiz.path("id");
            JsonNode pageNode = raiz.path("page");
            JsonNode totalPagesNode = raiz.path("total_pages");
            JsonNode totalResultsNode = raiz.path("total_results");

            Long id = extrairNumeroLongNo(idNode);
            Integer pagina = extrairNumeroIntegerNo(pageNode);
            Integer totalPaginas = extrairNumeroIntegerNo(totalPagesNode);
            Integer totalResultados = extrairNumeroIntegerNo(totalResultsNode);
            List<ComentarioDTO> comentariosDTO = json.convertValue(
                    resultadosArray,
                    new TypeReference<List<ComentarioDTO>>() {
                    }
            );
            return new Paginacao<>(Optional.ofNullable(id), pagina, totalPaginas, totalResultados, comentariosDTO);
        } catch (IOException ignored) {
            throw new RuntimeException("Deu erro ao desserizar");
        }
    }

    public List<ImagemFilmeDTO> buscarImagensFilme(String parametros, Long id) {
        System.out.println(parametros);
        String comentariosString = client.get()
                .uri("/movie/" + id + "/images" + parametros)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return extrairImagensFilme(comentariosString);
    }

    private List<ImagemFilmeDTO> extrairImagensFilme(String comentariosString) {
        try {
            System.out.println(comentariosString);
            JsonNode raiz = json.readTree(comentariosString);
            JsonNode resultadosArray = raiz.path("backdrops");

            return json.convertValue(
                    resultadosArray,
                    new TypeReference<List<ImagemFilmeDTO>>() {
                    }
            );
        } catch (IOException ignored) {
            throw new RuntimeException("Deu erro ao desserizar");
        }
    }
}
