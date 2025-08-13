export interface Paginacao<T> {
  pagina: number;
  quantPaginas: number;
  quantResultados: number;
  resultados: T[];
}
