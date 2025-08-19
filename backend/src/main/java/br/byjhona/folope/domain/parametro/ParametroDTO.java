package br.byjhona.folope.domain.parametro;

import java.util.Optional;

public record ParametroDTO(Optional<String> sortear, Optional<String> genero, Optional<String> query,
                           Optional<Integer> pagina, Optional<String> idioma, Optional<String> idiomaImagem) {
}
