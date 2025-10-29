package br.byjhona.folope.exception;

import br.byjhona.folope.domain.apiErro.ApiErro;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class InterceptadorExcecoes {

    @ExceptionHandler(ObjetoDuplicadoException.class)
    public ResponseEntity<ApiErro> tratarObjetoDuplicado(ObjetoDuplicadoException ex) {
        Map<String, String> detalhes = new HashMap<>();

        ApiErro resposta = new ApiErro(HttpStatus.CONFLICT.value(), ex.getMessage(), "path");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(resposta);
    }

    @ExceptionHandler({ObjetoNaoEncontradaException.class, EntityNotFoundException.class})
    public ResponseEntity<ApiErro> tratarObjetoNaoEncontrado(ObjetoNaoEncontradaException ex) {
        Map<String, String> detalhes = new HashMap<>();

        ApiErro resposta = new ApiErro(HttpStatus.NOT_FOUND.value(), ex.getMessage(), "");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resposta);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErro> tratarValidacoesCampos(MethodArgumentNotValidException ex) {
        Map<String, String> detalhes = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(erro -> {
            detalhes.put(erro.getField(), erro.getDefaultMessage());
        });

        ApiErro resposta = new ApiErro(HttpStatus.BAD_REQUEST.value(), "Campos inválidos", "");

        return ResponseEntity.badRequest().body(resposta);
    }


}
