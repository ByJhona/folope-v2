import api from "./api";
import { FilmeResumo } from "@/types";

export const matchService = {
  async criarSala(): Promise<void> {
    const response = await api.post<void>("/match/sala");
    return response.data;
  },

  async entrarSala(codigo: string): Promise<void> {
    const response = await api.post<void>(`/match/sala/${codigo}/entrar`);
    return response.data;
  },

  async curtirFilmeMatch(
    salaId: string,
    filmeId: number
  ): Promise<{ match: boolean; filme?: FilmeResumo }> {
    const response = await api.post(`/match/sala/${salaId}/curtir/${filmeId}`);
    return response.data;
  },

  async pularFilme(salaId: string, filmeId: number): Promise<FilmeResumo> {
    const response = await api.post<FilmeResumo>(
      `/match/sala/${salaId}/pular/${filmeId}`
    );
    return response.data;
  },

  async getProximoFilme(salaId: string): Promise<FilmeResumo> {
    const response = await api.get<FilmeResumo>(
      `/match/sala/${salaId}/proximo`
    );
    return response.data;
  },
};
