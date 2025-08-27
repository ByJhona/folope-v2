package br.byjhona.folope.exception;

import br.byjhona.folope.domain.codigoErro.CodigoErro;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class InterceptadorExcecoes {

    @ExceptionHandler(ObjetoDuplicadoException.class)
    public ResponseEntity<CodigoErro> tratarObjetoDuplicado(ObjetoDuplicadoException ex) {
        Map<String, String> detalhes = new HashMap<>();

        CodigoErro resposta = new CodigoErro(HttpStatus.CONFLICT.value(), ex.getMessage(), detalhes, Instant.now());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(resposta);
    }

    @ExceptionHandler({ObjetoNaoEncontradaException.class, EntityNotFoundException.class})
    public ResponseEntity<CodigoErro> tratarObjetoNaoEncontrado(ObjetoNaoEncontradaException ex) {
        Map<String, String> detalhes = new HashMap<>();

        CodigoErro resposta = new CodigoErro(HttpStatus.NOT_FOUND.value(), ex.getMessage(), detalhes, Instant.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resposta);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CodigoErro> tratarValidacoesCampos(MethodArgumentNotValidException ex) {
        Map<String, String> detalhes = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(erro -> {
            detalhes.put(erro.getField(), erro.getDefaultMessage());
        });

        CodigoErro resposta = new CodigoErro(HttpStatus.BAD_REQUEST.value(), "Campos inválidos", detalhes, Instant.now());

        return ResponseEntity.badRequest().body(resposta);
    }


}
