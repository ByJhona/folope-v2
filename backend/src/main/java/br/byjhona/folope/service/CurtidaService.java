package br.byjhona.folope.service;

import br.byjhona.folope.domain.curtida.AlvoCurtidaEnum;
import br.byjhona.folope.domain.curtida.Curtida;
import br.byjhona.folope.domain.curtida.CurtidaDTO;
import br.byjhona.folope.exception.ObjetoDuplicadoException;
import br.byjhona.folope.exception.ObjetoNaoEncontradaException;
import br.byjhona.folope.repository.CurtidaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class CurtidaService {
    private final CurtidaRepository curtidaRepo;


    public CurtidaService(CurtidaRepository curtidaRepo) {
        this.curtidaRepo = curtidaRepo;
    }

    @Transactional
    public CurtidaDTO salvarCurtidaBD(CurtidaDTO dto, String idUsuario) {
        boolean existe = curtidaRepo.existsByIdUsuarioAndIdAlvoAndAlvo(idUsuario, dto.idAlvo(), dto.alvo());

        if (existe) {
            throw new ObjetoDuplicadoException("Curtida já existe para o filme de id %s", dto.idAlvo());
        }

        Curtida curtida = new Curtida(dto, idUsuario);
        Curtida salvo = curtidaRepo.save(curtida);
        return converterCurtidaParaDTO(salvo);
    }

    public CurtidaDTO buscarCurtidaBD(String idUsuario, Long idAlvo, AlvoCurtidaEnum alvo) {
        Curtida curtidaSalva = this.curtidaRepo.findByIdUsuarioAndIdAlvoAndAlvo(idUsuario, idAlvo, alvo);
        return converterCurtidaParaDTO(curtidaSalva);
    }

    public Boolean buscarExistenciaCurtidaBD(String idUsuario, Long idAlvo, AlvoCurtidaEnum alvo) {
        return this.curtidaRepo.existsByIdUsuarioAndIdAlvoAndAlvo(idUsuario, idAlvo, alvo);
    }


    private CurtidaDTO converterCurtidaParaDTO(Curtida curtida) {
        return new CurtidaDTO(curtida.getId(), curtida.getIdAlvo(), curtida.getAlvo());
    }

    @Transactional
    public void deletarCurtidaBD(String idUsuario, Long idAlvo, AlvoCurtidaEnum alvo) {
        boolean existe = curtidaRepo.existsByIdUsuarioAndIdAlvoAndAlvo(idUsuario, idAlvo, alvo);

        if (!existe) {
            throw new ObjetoNaoEncontradaException("Curtida não existe no sistema.");
        }
        this.curtidaRepo.deleteByIdUsuarioAndIdAlvoAndAlvo(idUsuario, idAlvo, alvo);
    }
}
