import api from "./api";
import { Post, Comentario } from "@/types";

export const feedService = {
  async getFeed(page = 1): Promise<Post[]> {
    const response = await api.get<Post[]>("/feed", { params: { page } });
    return response.data;
  },

  async curtirPost(postId: number): Promise<void> {
    await api.post(`/feed/${postId}/curtir`);
  },

  async descurtirPost(postId: number): Promise<void> {
    await api.delete(`/feed/${postId}/curtir`);
  },

  async comentar(filmeId: number, texto: string): Promise<Comentario> {
    const response = await api.post<Comentario>(
      `/filmes/${filmeId}/comentarios`,
      { texto }
    );
    return response.data;
  },

  async getComentariosFilme(filmeId: number, page = 1): Promise<Comentario[]> {
    const response = await api.get<Comentario[]>(
      `/filmes/${filmeId}/comentarios`,
      { params: { page } }
    );
    return response.data;
  },
};
