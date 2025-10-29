package br.byjhona.folope.repository;

import br.byjhona.folope.domain.like.Like;
import br.byjhona.folope.domain.like.LikeTargetEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserIdAndTargetIdAndTargetType(Long userId, Long targetId, LikeTargetEnum targetType);

    Boolean existsByUserIdAndTargetIdAndTargetType(Long userId, Long targetId, LikeTargetEnum targetType);

    void deleteByUserIdAndTargetIdAndTargetType(Long userId, Long targetId, LikeTargetEnum targetType);

}
