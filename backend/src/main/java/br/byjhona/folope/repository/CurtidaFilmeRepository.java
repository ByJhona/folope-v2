package br.byjhona.folope.repository;

import br.byjhona.folope.domain.curtidaFilme.CurtidaFilme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CurtidaFilmeRepository extends JpaRepository<CurtidaFilme, Long> {

    Optional<CurtidaFilme> findByUsuarioIdAndFilmeId(Long usuarioId, Long filmeId);

    Boolean existsByUsuarioIdAndFilmeId(Long usuarioId, Long filmeId);

    Optional<CurtidaFilme> deleteByUsuarioIdAndFilmeId(Long usuarioId, Long filmeId);
}
