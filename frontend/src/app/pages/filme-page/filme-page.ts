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
  desejou = signal<boolean>(false);

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
            desejou: this.api.buscarExistenciaDesejo(id),
          });
        })
      )
      .subscribe(({ filme, comentarios, imagens, curtiu, desejou }) => {
        this.comentarios = comentarios.resultados;
        this.filme.set(filme);
        this.imagens = imagens;
        this.curtiu.set(curtiu);
        this.desejou.set(desejou);
      });
  }

  curtirFilme(curtiu: boolean): void {
    const idFilme = this.filme()?.id;

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

  desejarFilme(desejou: boolean): void {
    const idFilme = this.filme()?.id;

    if (idFilme !== undefined && desejou) {
      this.api.salvarDesejo(idFilme).subscribe(() => {
        this.desejou.set(true);
      });
    } else if (idFilme !== undefined && !desejou) {
      this.api.removerDesejo(idFilme).subscribe(() => {
        this.desejou.set(false);
      });
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
