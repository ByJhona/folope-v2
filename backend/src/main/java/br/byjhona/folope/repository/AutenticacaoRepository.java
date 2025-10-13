package br.byjhona.folope.repository;

import br.byjhona.folope.domain.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AutenticacaoRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByApelido(String apelido);
}
