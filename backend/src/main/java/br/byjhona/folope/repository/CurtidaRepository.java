package br.byjhona.folope.repository;

import br.byjhona.folope.domain.curtida.AlvoCurtidaEnum;
import br.byjhona.folope.domain.curtida.Curtida;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurtidaRepository extends JpaRepository<Curtida, Long> {

    Curtida findByIdUsuarioAndIdAlvoAndAlvo(String idUsuario, Long aLong, AlvoCurtidaEnum alvo);

    Boolean existsByIdUsuarioAndIdAlvoAndAlvo(String idUsuario, Long idAlvo, AlvoCurtidaEnum alvo);
}
