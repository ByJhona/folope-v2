package br.byjhona.folope.service;

import br.byjhona.folope.domain.filmeDesejado.FilmeDesejado;
import br.byjhona.folope.domain.filmeDesejado.FilmeDesejadoDTO;
import br.byjhona.folope.exception.ObjetoDuplicadoException;
import br.byjhona.folope.exception.ObjetoNaoEncontradaException;
import br.byjhona.folope.repository.FilmeDesejadoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class FilmeDesejadoService {
    private final FilmeDesejadoRepository filmeDesejadoRepo;


    public FilmeDesejadoService(FilmeDesejadoRepository filmeDesejadoRepo) {
        this.filmeDesejadoRepo = filmeDesejadoRepo;
    }

    @Transactional
    public FilmeDesejadoDTO salvarFilmeDesejadoBD(FilmeDesejadoDTO dto, String idUsuario) {
        boolean existe = filmeDesejadoRepo.existsByIdUsuarioAndIdFilme(idUsuario, dto.idFilme());

        if (existe) {
            throw new ObjetoDuplicadoException("Filme já adicionado na watchlist");
        }

        FilmeDesejado filmeDesejado = new FilmeDesejado(dto, idUsuario);
        FilmeDesejado salvo = filmeDesejadoRepo.save(filmeDesejado);
        return converterFilmeDesejadoParaDTO(salvo);
    }

    public FilmeDesejadoDTO buscarFilmeDesejadoBD(String idUsuario, Long idFilme) {
        FilmeDesejado filmeSalvo = this.filmeDesejadoRepo.findByIdUsuarioAndIdFilme(idUsuario, idFilme);
        return converterFilmeDesejadoParaDTO(filmeSalvo);
    }

    public Boolean buscarExistenciaFilmeDesejadoBD(String idUsuario, Long idFilme) {
        return this.filmeDesejadoRepo.existsByIdUsuarioAndIdFilme(idUsuario, idFilme);
    }

    private FilmeDesejadoDTO converterFilmeDesejadoParaDTO(FilmeDesejado filme) {
        return new FilmeDesejadoDTO(filme.getIdFilme(), filme.getData());
    }

    @Transactional
    public void deletarFilmeDesejadoBD(String idUsuario, Long idFilme) {
        boolean existe = filmeDesejadoRepo.existsByIdUsuarioAndIdFilme(idUsuario, idFilme);

        if (!existe) {
            throw new ObjetoNaoEncontradaException("O filme não está na watchlist.");
        }
        this.filmeDesejadoRepo.deleteByIdUsuarioAndIdFilme(idUsuario, idFilme);
    }
}
