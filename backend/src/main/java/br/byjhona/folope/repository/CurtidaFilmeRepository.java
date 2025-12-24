package br.byjhona.folope.repository;

import br.byjhona.folope.domain.curtidaFilme.CurtidaFilme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CurtidaRepository extends JpaRepository<CurtidaFilme, Long> {

    Optional<CurtidaFilme> findByUserIdAndTargetIdAndTargetType(Long userId, Long targetId, CurtidaEnum targetType);

    Boolean existsByUserIdAndTargetIdAndTargetType(Long userId, Long targetId, CurtidaEnum targetType);

    void deleteByUserIdAndTargetIdAndTargetType(Long userId, Long targetId, CurtidaEnum targetType);

}
