package br.byjhona.folope.repository;

import br.byjhona.folope.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Usuario, Long> {

}
