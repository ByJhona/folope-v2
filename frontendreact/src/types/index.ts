export interface CurtidaFilme {
  id?: number;
  usuarioId: number;
  filmeId: number;
  criado: Date;
}

export interface Paginacao<T> {
  pagina: number;
  quantPaginas: number;
  quantResultados: number;
  resultados: T[];
}

export interface Filme {
  id: number;
  titulo: string;
  urlCapaFundo: string;
  urlCapaPoster: string;
  idGeneros: number[];
  sinopse: string;
  dataLancamento: Date;
  duracao: number;
  nota: number;
}

export interface FilmeResumo {
  id: number;
  titulo: string;
  urlCapaFundo: string;
  urlCapaPoster: string;
  idGeneros: number[];
  sinopse: string;
  dataLancamento: Date;
  nota: number;
}

export interface Usuario {
  id: number;
  nome: string;
  username: string;
  avatar: string;
  bio?: string;
  seguidores: number;
  seguindo: number;
  curtidas: number;
  comentarios: number;
  pontuacao: number;
}

export interface Comentario {
  id: number;
  usuario: Usuario;
  filme: FilmeResumo;
  texto: string;
  data: Date;
  curtidas: number;
  curtido: boolean;
}

export interface Post {
  id: number;
  usuario: Usuario;
  filme: FilmeResumo;
  texto: string;
  data: Date;
  curtidas: number;
  comentariosCount: number;
  curtido: boolean;
}

export interface Genero {
  id: number;
  nome: string;
}
