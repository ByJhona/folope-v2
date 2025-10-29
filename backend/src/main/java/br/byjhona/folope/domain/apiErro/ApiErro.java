package br.byjhona.folope.domain.apiErro;

import java.time.Instant;

public record ApiErro(int status,
                      String error,
                      String path,
                      Instant timestamp
) {
    public ApiErro(int status, String error, String path) {
        this(status, error, path, Instant.now());

    }
}
