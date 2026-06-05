package br.byjhona.folope.exception;

public class ObjetoDuplicadoException extends RuntimeException {
    public ObjetoDuplicadoException(String mensagem) {
        super(mensagem);
    }

    public ObjetoDuplicadoException(String mensagem, Object... argumentos) {
        super(String.format(mensagem, argumentos));
    }


}
