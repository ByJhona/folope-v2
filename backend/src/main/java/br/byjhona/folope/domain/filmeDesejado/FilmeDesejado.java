package br.byjhona.folope.domain.filmeDesejado;

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
@Table(name = "desejo")
public class FilmeDesejado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_filme")
    private Long idFilme;
    @Column(name = "id_usuario")
    private String idUsuario;
    @Column(name = "data")
    private Instant data;

    public FilmeDesejado(FilmeDesejadoDTO dto, String idUsuario) {
        this.idFilme = dto.idFilme();
        this.idUsuario = idUsuario;
        this.data = Instant.now();
    }
}
