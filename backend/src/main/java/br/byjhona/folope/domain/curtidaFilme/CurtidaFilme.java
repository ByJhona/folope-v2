package br.byjhona.folope.domain.like;

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
    private Long targetId;
    @Column(name = "id_usuario")
    private Long userId;
    @Column(name = "alvo")
    @Enumerated(EnumType.STRING)
    private CurtidaEnum targetType;
    @Column(name = "data")
    private Instant timestramp;


    public Curtida(CurtidaDTO dto, Long userId) {
        this.targetId = dto.targetId();
        this.userId = userId;
        this.targetType = dto.targetType();
        this.timestramp = Instant.now();
    }
}
