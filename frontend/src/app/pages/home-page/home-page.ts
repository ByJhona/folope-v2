import { Component } from '@angular/core';
import { ApiFolope } from '../../services/api-folope';
import { FilmeResumo } from '../../types/FilmeResumo';
import { Paginacao } from '../../types/Paginacao';
import { CardInfo } from '../../components/card-info/card-info';
import { CardFilmePrincipal } from '../../components/card-filme-principal/card-filme-principal';

@Component({
  selector: 'folope-home-page',
  imports: [CardInfo, CardFilmePrincipal],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  filmes!: FilmeResumo[];
  filmeMaisPopular!: FilmeResumo;
  filmesCurtidos: FilmeResumo[] = [];
  filmesDescurtidos: FilmeResumo[] = [];

  constructor(private readonly apiServ: ApiFolope) {
    apiServ
      .listarFilmesPopulares()
      .subscribe((filmesPaginados: Paginacao<FilmeResumo>) => {
        this.filmeMaisPopular = filmesPaginados.resultados[0];
        filmesPaginados.resultados.shift();
        this.filmes = filmesPaginados.resultados;
      });
  }

  curtirFilme(FilmeResumo: FilmeResumo) {
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
