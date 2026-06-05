import api from "./api";
import { Usuario } from "@/types";

export const usuarioService = {
  async obterUsuario(): Promise<Usuario> {
    const response = await api.get(`/usuario`);
    return response.data;
  },
};
