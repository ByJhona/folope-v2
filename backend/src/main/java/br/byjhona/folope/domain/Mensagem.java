package br.byjhona.folope.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Mensagem {
    private String mensagem;

    public Mensagem(String mensagem){
        this.mensagem = mensagem;
    }
}
