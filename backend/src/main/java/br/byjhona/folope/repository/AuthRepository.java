package br.byjhona.folope.repository;

import br.byjhona.folope.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByNome(String nomeUsuario);
}
