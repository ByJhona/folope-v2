package br.byjhona.folope.repository;

import br.byjhona.folope.domain.salaMatch.Sala;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SalaRepository extends JpaRepository<Sala, Long> {

    Optional<Sala> findByCodigo(String codigo);

    boolean existsByCodigo(String codigo);

}
