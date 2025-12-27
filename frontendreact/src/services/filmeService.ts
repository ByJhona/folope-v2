import api from "./api";
import {
  CurtidaFilme,
  Filme,
  FilmeResumo,
  Paginacao,
  WatchlistFilme,
} from "@/types";

export const filmeService = {
  async getFilmeDestaque(): Promise<Filme> {
    const response = await api.get<Filme>("/filmes/destaque");
    return response.data;
  },

  async getFilmesPopulares(page = 1): Promise<Paginacao<FilmeResumo>> {
    const response = await api.get<Paginacao<FilmeResumo>>(
      "/filmes/populares",
      {
        params: { page },
      }
    );
    return response.data;
  },

  async getFilmesDescoberta(page = 1): Promise<Paginacao<FilmeResumo>> {
    const response = await api.get<Paginacao<FilmeResumo>>(
      "/filmes/descoberta",
      {
        params: { page },
      }
    );
    return response.data;
  },

  async getFilmesRecentes(page = 1): Promise<FilmeResumo[]> {
    const response = await api.get<FilmeResumo[]>("/filmes/recentes", {
      params: { page },
    });
    return response.data;
  },

  async getFilmeById(id: string): Promise<Filme> {
    const response = await api.get<Filme>(`/filmes/${id}`);
    return response.data;
  },

  async buscarFilmes(query: string, page = 1): Promise<FilmeResumo[]> {
    const response = await api.get<FilmeResumo[]>("/filmes/busca", {
      params: { query, page },
    });
    return response.data;
  },

  async curtirFilme(filmeId: string): Promise<FilmeResumo> {
    const response = await api.post(`/filmes/${filmeId}/curtir`);
    return response.data;
  },

  async descurtirFilme(filmeId: string): Promise<FilmeResumo> {
    const response = await api.delete(`/filmes/${filmeId}/curtir`);
    return response.data;
  },

  async buscarCurtidaFilme(filmeId: string): Promise<CurtidaFilme> {
    return api.get(`/filmes/${filmeId}/curtir`);
  },
  async verificarExistenciaCurtidaFilme(filmeId: string): Promise<boolean> {
    const response = await api.get(`/filmes/${filmeId}/curtir/status`);
    return response.data;
  },

  async contarCurtidas(filmeId: string): Promise<number> {
    const response = await api.get(`/filmes/${filmeId}/curtir/quantidade`);
    return response.data;
  },

  async adicionarWatchlistFilme(filmeId: string): Promise<WatchlistFilme> {
    const response = await api.post(`/filmes/${filmeId}/watchlist`);
    return response.data;
  },

  async removerWatchlistFilme(filmeId: string): Promise<WatchlistFilme> {
    const response = await api.delete(`/filmes/${filmeId}/watchlist`);
    return response.data;
  },

  async verificarExistenciaWatchlistFilme(filmeId: string): Promise<boolean> {
    const response = await api.get(`/filmes/${filmeId}/watchlist/status`);
    return response.data;
  },
};
