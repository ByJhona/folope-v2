package br.byjhona.folope.domain.curtida;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "curtida")
public class Curtida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_alvo")
    private Long idAlvo;
    @Column(name = "id_usuario")
    private String idUsuario;
    @Column(name = "alvo")
    @Enumerated(EnumType.STRING)
    private AlvoCurtidaEnum alvo;
    @Column(name = "data")
    private Instant data;


    public Curtida(CurtidaDTO dto, String idUsuario) {
        this.idAlvo = dto.idAlvo();
        this.idUsuario = idUsuario;
        this.alvo = dto.alvo();
        this.data = Instant.now();
    }
}
