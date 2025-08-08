import { FilmeDescoberta } from "./FilmeDescoberta";

export class FilmesResponse {
    pagina: number
    quantPaginas: number
    filmes: FilmeDescoberta[]
    constructor() {
        this.pagina = 0
        this.quantPaginas = 0
        this.filmes = []
    }
    super(pagina: number, quantPaginas: number, filmes: FilmeDescoberta[]) {
        this.pagina = pagina
        this.quantPaginas = quantPaginas
        this.filmes = filmes
    }
}