package br.byjhona.folope.domain.comentario;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ComentarioAutorDetalhesDTO(@JsonAlias("name") String nome,
                                         @JsonAlias("username") String nomeUsuario,
                                         @JsonAlias("avatar_path") String fotoUsuario,
                                         @JsonAlias("rating") Integer nota) {

    public ComentarioAutorDetalhesDTO(String nome, String nomeUsuario, String fotoUsuario, Integer nota) {
        this.nome = nome;
        this.nomeUsuario = nomeUsuario;
        this.fotoUsuario = "https://image.tmdb.org/t/p/w300" + fotoUsuario;
        this.nota = nota;
    }
}
