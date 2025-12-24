import api from "./api";
import { CurtidaFilme, Filme, FilmeResumo, Paginacao } from "@/types";

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

  async curtirFilme(filmeId: string): Promise<void> {
    await api.post(`/filmes/${filmeId}/curtir`);
  },

  async descurtirFilme(filmeId: number): Promise<void> {
    await api.delete(`/filmes/${filmeId}/curtir`);
  },

  async buscarCurtidaFilme(filmeId: string): Promise<CurtidaFilme> {
    return api.get(`/filmes/${filmeId}/curtir`);
  },
  async verificarExistenciaCurtidaFilme(filmeId: string): Promise<boolean> {
    const response = await api.get(`/filmes/${filmeId}/curtir/status`);
    return response.data;
  },
};
