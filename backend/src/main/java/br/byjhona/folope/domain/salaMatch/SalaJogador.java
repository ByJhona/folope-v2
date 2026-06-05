package br.byjhona.folope.domain.salaMatch;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(
        name = "sala_jogador",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"sala_id", "usuario_id"})
        }
)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SalaJogador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sala_id", nullable = false)
    private Long salaId;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private SalaRegra regra;

    @Column(name = "conectado", nullable = false)
    private boolean conectado;

    @Column(name = "criado", nullable = false)
    private Instant criado;

    @Column(name = "saiu")
    private Instant saiu;
}
