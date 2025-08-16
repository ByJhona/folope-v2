export interface Comentario {
  autor: string;
  detalhes_autor: ComentarioAutorDetalhes;
  comentario: string;
  criado: Date;
  id: string;
  atualizado: Date;
}

export interface ComentarioAutorDetalhes {
  nome: string | null;
  nomeUsuario: string | null;
  fotoUsuario: string | null;
  nota: number | null;
}
