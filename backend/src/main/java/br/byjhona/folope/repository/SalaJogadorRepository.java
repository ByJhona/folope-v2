package br.byjhona.folope.repository;

import br.byjhona.folope.domain.salaMatch.SalaJogador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SalaJogadorRepository extends JpaRepository<SalaJogador, Long> {

    List<SalaJogador> findBySalaId(Long salaId);

    Optional<SalaJogador> findBySalaIdAndUsuarioId(Long salaId, Long usuarioId);

    long countBySalaIdAndSaiuIsNull(Long salaId);
}
