import { Component } from '@angular/core';
import { ApiFolope } from '../../services/api-folope';
import { FilmeDescoberta } from '../../types/FilmeDescoberta';
import { CardDeslizante } from '../../components/card-deslizante/card-deslizante';

@Component({
  selector: 'folope-home-page',
  imports: [CardDeslizante],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  filmes!: FilmeDescoberta[];
  filmesCurtidos: FilmeDescoberta[] = [];
  filmesDescurtidos: FilmeDescoberta[] = [];

  constructor(private readonly apiServ: ApiFolope) {}

  curtirFilme(filmeDescoberta: FilmeDescoberta) {
    console.log(filmeDescoberta);
    this.filmesCurtidos.push(filmeDescoberta);
    this.removerFilmeLista(filmeDescoberta);
  }
  descurtirFilme(filmeDescoberta: FilmeDescoberta) {
    this.filmesDescurtidos.push(filmeDescoberta);
    this.removerFilmeLista(filmeDescoberta);
  }

  removerFilmeLista(filmeDescoberta: FilmeDescoberta) {
    this.filmes = this.filmes.filter((filme) => filme != filmeDescoberta);
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
