export interface Paginacao<T> {
  id?: number;
  pagina: number;
  quantPaginas: number;
  quantResultados: number;
  resultados: T[];
}
