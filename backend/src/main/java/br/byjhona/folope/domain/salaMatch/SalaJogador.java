package br.byjhona.folope.domain.salaMatch;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sala")
@Getter
public class SalaJogador {
    @Id
    @Column(name = "id")
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


}
