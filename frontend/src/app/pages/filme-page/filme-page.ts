import {
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CardFilmePrincipal } from '../../components/card-filme-principal/card-filme-principal';
import { FilmeResumo } from '../../types/FilmeResumo';
import { ApiFolope } from '../../services/api-folope';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { CardComentario } from '../../components/card-comentario/card-comentario';
import { Comentario } from '../../types/Comentario';
import { ImagemFilme } from '../../types/ImagemFilme';

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
  imagens!: ImagemFilme[];
  @ViewChildren('carouselItem') itensCarrosselImagens!: QueryList<ElementRef>;

  constructor() {
    this.rotaAtiva.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          return forkJoin({
            filme: this.api.pesquisarFilmeId(id),
            comentarios: this.api.pesquisarComentariosFilmeId(id),
            imagens: this.api.pesquisarImagensFilmeId(id),
          });
        })
      )
      .subscribe(({ filme, comentarios, imagens }) => {
        this.filme = filme;
        this.comentarios = comentarios.resultados;
        this.imagens = imagens;
      });
  }

  navegarCarrossel(index: number): void {
    const indexTratada = (index + this.imagens.length) % this.imagens.length;

    const element = this.itensCarrosselImagens.get(indexTratada);
    if (element) {
      element.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }
}
