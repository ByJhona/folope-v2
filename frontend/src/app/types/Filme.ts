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
