package br.byjhona.folope.service;

import br.byjhona.folope.domain.like.Like;
import br.byjhona.folope.domain.like.LikeDTO;
import br.byjhona.folope.domain.like.LikeTargetEnum;
import br.byjhona.folope.exception.ObjetoDuplicadoException;
import br.byjhona.folope.exception.ObjetoNaoEncontradaException;
import br.byjhona.folope.repository.LikeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final LikeRepository likeRepo;

    public UserService(LikeRepository likeRepo) {
        this.likeRepo = likeRepo;
    }

    @Transactional
    public LikeDTO saveLike(LikeDTO dto, Long idUser) {
        boolean existe = likeRepo.existsByUserIdAndTargetIdAndTargetType(idUser, dto.targetId(), dto.targetType());

        if (existe) {
            throw new ObjetoDuplicadoException("Like já existe para o filme de id %s", dto.targetId());
        }

        Like like = new Like(dto, idUser);
        Like salvo = likeRepo.save(like);
        return convertLikeToDto(salvo);
    }

    public LikeDTO findLike(Long idUsuario, Long idAlvo, LikeTargetEnum alvo) {
        Optional<Like> likeSaved = likeRepo.findByUserIdAndTargetIdAndTargetType(idUsuario, idAlvo, alvo);
        return likeSaved.map(this::convertLikeToDto).orElseThrow(() -> new RuntimeException("Curtida não existe no banco de dados."));
    }

    private LikeDTO convertLikeToDto(Like like) {
        return new LikeDTO(like.getId(), like.getTargetId(), like.getTargetType(), like.getTimestramp());
    }

    @Transactional
    public void deleteLike(Long idUser, Long targetId, LikeTargetEnum targetType) {
        boolean existe = likeRepo.existsByUserIdAndTargetIdAndTargetType(idUser, targetId, targetType);

        if (!existe) {
            throw new ObjetoNaoEncontradaException("Like não existe no sistema.");
        }
        likeRepo.deleteByUserIdAndTargetIdAndTargetType(idUser, targetId, targetType);
    }
}
