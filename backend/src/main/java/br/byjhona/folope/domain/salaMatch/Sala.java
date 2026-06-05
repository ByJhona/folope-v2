package br.byjhona.folope.domain.salaMatch;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.SecureRandom;
import java.time.Instant;

@Entity
@Table(name = "sala")
@Getter
@Setter
@NoArgsConstructor
public class Sala {

    private static final String ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int TAMANHO_CODIGO = 6;
    private static final SecureRandom RANDOM = new SecureRandom();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo", nullable = false, unique = true, length = 10)
    private String codigo;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private SalaStatus status;

    @Column(name = "dono_id", nullable = false)
    private Long donoID;

    @Column(name = "ativa", nullable = false)
    private boolean ativa;

    @Column(name = "criado", nullable = false)
    private Instant criado;

    public Sala(Long donoID) {
        this.nome = "Sala de Fulano";
        this.donoID = donoID;
        this.codigo = gerarCodigo();
        this.status = SalaStatus.LOBBY;
        this.ativa = true;
        this.criado = Instant.now();
    }

    private String gerarCodigo() {
        StringBuilder sb = new StringBuilder(TAMANHO_CODIGO);
        for (int i = 0; i < TAMANHO_CODIGO; i++) {
            sb.append(ALFABETO.charAt(RANDOM.nextInt(ALFABETO.length())));
        }
        return sb.toString();
    }
}
