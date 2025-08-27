import {
  Component,
  ElementRef,
  inject,
  QueryList,
  signal,
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
import { CurtidaAlvoEnum } from '../../types/Curtida';

@Component({
  selector: 'folope-filme-page',
  imports: [CardFilmePrincipal, CardComentario],
  templateUrl: './filme-page.html',
  styleUrl: './filme-page.scss',
})
export class FilmePage {
  private readonly rotaAtiva = inject(ActivatedRoute);
  private readonly api = inject(ApiFolope);
  filme = signal<FilmeResumo | undefined>(undefined);
  comentarios!: Comentario[];
  imagens!: ImagemFilme[];
  curtiu = signal<boolean>(false);
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
            curtiu: this.api.buscarExistenciaCurtida(id, CurtidaAlvoEnum.FILME),
          });
        })
      )
      .subscribe(({ filme, comentarios, imagens, curtiu }) => {
        this.filme.set(filme);
        this.comentarios = comentarios.resultados;
        this.imagens = imagens;
        this.curtiu.set(curtiu);
        console.log('Curtiu:', this.curtiu());
      });
  }

  curtirFilme(curtiu: boolean): void {
    const idFilme = this.filme()?.id;
    console.log('Curtiu (método):', curtiu);

    if (idFilme !== undefined && curtiu) {
      this.api.salvarCurtida(idFilme, CurtidaAlvoEnum.FILME).subscribe(() => {
        this.curtiu.set(true);
      });
    } else if (idFilme !== undefined && !curtiu) {
      this.api.removerCurtida(idFilme, CurtidaAlvoEnum.FILME).subscribe(() => {
        this.curtiu.set(false);
      });
    }
  }

  buscarExistenciaCurtida() {
    const idFilme = this.filme()?.id;

    if (idFilme !== undefined) {
      this.api
        .buscarExistenciaCurtida(idFilme, CurtidaAlvoEnum.FILME)
        .subscribe((existe) => {});
    }
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
