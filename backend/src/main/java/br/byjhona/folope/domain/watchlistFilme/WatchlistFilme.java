package br.byjhona.folope.domain.watchlistFilme;

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
@Table(name = "watchlist_filme")
public class WatchlistFilme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_filme")
    private Long filmeId;
    @Column(name = "id_usuario")
    private Long usuarioId;
    @Column(name = "criado")
    private Instant criado;


    public WatchlistFilme(Long usuarioId, Long filmeId) {
        this.filmeId = filmeId;
        this.usuarioId = usuarioId;
        this.criado = Instant.now();
    }
}
