package br.byjhona.folope.domain.codigoErro;

import java.time.Instant;
import java.util.Map;

public record CodigoErro(int status,
                         String erro,
                         Map<String, String> detalhes,
                         Instant data) {
}
