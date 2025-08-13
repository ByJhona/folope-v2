import { Component } from '@angular/core';
import { ApiFolope } from '../../services/api-folope';
import { FilmeResumo } from '../../types/FilmeResumo';
import { Paginacao } from '../../types/Paginacao';
import { CardInfo } from '../../components/card-info/card-info';

@Component({
  selector: 'folope-home-page',
  imports: [CardInfo],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  filmes!: FilmeResumo[];
  filmesCurtidos: FilmeResumo[] = [];
  filmesDescurtidos: FilmeResumo[] = [];

  constructor(private readonly apiServ: ApiFolope) {
    apiServ
      .listarFilmes()
      .subscribe((filmesPaginados: Paginacao<FilmeResumo>) => {
        this.filmes = filmesPaginados.resultados;
        console.log(filmesPaginados);
      });
  }

  curtirFilme(FilmeResumo: FilmeResumo) {
    console.log(FilmeResumo);
    this.filmesCurtidos.push(FilmeResumo);
    this.removerFilmeLista(FilmeResumo);
  }
  descurtirFilme(FilmeResumo: FilmeResumo) {
    this.filmesDescurtidos.push(FilmeResumo);
    this.removerFilmeLista(FilmeResumo);
  }

  removerFilmeLista(FilmeResumo: FilmeResumo) {
    this.filmes = this.filmes.filter((filme) => filme != FilmeResumo);
  }

  publico() {
    this.apiServ.publico().subscribe((mensagem) => {
      console.log(mensagem);
    });
  }

  privado() {
    this.apiServ.privado().subscribe((mensagem) => {
      console.log(mensagem);
    });
  }
}
