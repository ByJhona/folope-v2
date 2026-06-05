package br.byjhona.folope.repository;

import br.byjhona.folope.domain.curtidaFilme.CurtidaFilme;
import br.byjhona.folope.domain.watchlistFilme.WatchlistFilme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WatchlistFilmeRepository extends JpaRepository<WatchlistFilme, Long> {

    Optional<WatchlistFilme> findByUsuarioIdAndFilmeId(Long usuarioId, Long filmeId);

    Boolean existsByUsuarioIdAndFilmeId(Long usuarioId, Long filmeId);

    Optional<WatchlistFilme> deleteByUsuarioIdAndFilmeId(Long usuarioId, Long filmeId);
}
