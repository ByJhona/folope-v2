import { Component, inject } from '@angular/core';
import { CardFilmePrincipal } from '../../components/card-filme-principal/card-filme-principal';
import { FilmeResumo } from '../../types/FilmeResumo';
import { ApiFolope } from '../../services/api-folope';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { CardComentario } from '../../components/card-comentario/card-comentario';
import { Comentario } from '../../types/Comentario';

@Component({
  selector: 'folope-filme-page',
  imports: [CardFilmePrincipal, CardComentario],
  templateUrl: './filme-page.html',
  styleUrl: './filme-page.scss',
})
export class FilmePage {
  private readonly rotaAtiva = inject(ActivatedRoute);
  private readonly api = inject(ApiFolope);
  filme: FilmeResumo | undefined = undefined;
  comentarios!: Comentario[];

  constructor() {
    this.rotaAtiva.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          return forkJoin({
            filme: this.api.pesquisarFilmeId(id),
            comentarios: this.api.pesquisarComentariosFilmeId(id),
          });
        })
      )
      .subscribe(({ filme, comentarios }) => {
        this.filme = filme;
        this.comentarios = comentarios.resultados;
        console.log('Filme:', filme);
      });
  }
}
