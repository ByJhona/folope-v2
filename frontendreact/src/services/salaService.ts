import api from "./api";
import { Sala } from "@/types";

export const salaService = {
  async criarSala(): Promise<Sala> {
    const response = await api.post<Sala>("/sala/criar");
    return response.data;
  },

  async buscarPorCodigo(codigo: string): Promise<Sala> {
    const response = await api.get<Sala>(`/sala/${codigo}`);
    return response.data;
  },
  async entrarSala(codigo: string): Promise<Sala> {
    const response = await api.post<Sala>(`/sala/${codigo}/entrar`);
    return response.data;
  },
};
