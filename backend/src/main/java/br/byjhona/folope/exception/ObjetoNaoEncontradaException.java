package br.byjhona.folope.exception;

public class ObjetoNaoEncontradaException extends RuntimeException {
    public ObjetoNaoEncontradaException(String mensagem) {
        super(mensagem);
    }

    public ObjetoNaoEncontradaException(String mensagem, Object... argumentos) {
        super(String.format(mensagem, argumentos));
    }


}
