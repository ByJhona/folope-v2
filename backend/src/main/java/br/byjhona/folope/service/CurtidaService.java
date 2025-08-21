package br.byjhona.folope.service;

import br.byjhona.folope.domain.curtida.AlvoCurtidaEnum;
import br.byjhona.folope.domain.curtida.Curtida;
import br.byjhona.folope.domain.curtida.CurtidaDTO;
import br.byjhona.folope.repository.CurtidaRepository;
import org.springframework.stereotype.Service;

@Service
public class CurtidaService {
    private final CurtidaRepository curtidaRepo;


    public CurtidaService(CurtidaRepository curtidaRepo) {
        this.curtidaRepo = curtidaRepo;
    }

    public CurtidaDTO salvarCurtidaBD(CurtidaDTO curtidaDTO, String idUsuario) {
        Curtida curtida = new Curtida(curtidaDTO, idUsuario);
        Curtida curtidaSalva = this.curtidaRepo.save(curtida);
        return converterCurtidaParaDTO(curtidaSalva);
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
}
