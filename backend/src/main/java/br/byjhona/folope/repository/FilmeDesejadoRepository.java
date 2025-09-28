package br.byjhona.folope.repository;

import br.byjhona.folope.domain.filmeDesejado.FilmeDesejado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmeDesejadoRepository extends JpaRepository<FilmeDesejado, Long> {

    FilmeDesejado findByIdUsuarioAndIdFilme(String idUsuario, Long idFilme);

    Boolean existsByIdUsuarioAndIdFilme(String idUsuario, Long idFilme);

    void deleteByIdUsuarioAndIdFilme(String idUsuario, Long idFilme);
}
