import { Component, input, output } from '@angular/core';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { FilmeResumo } from '../../types/FilmeResumo';

@Component({
  selector: 'folope-card-deslizante',
  imports: [CdkDrag],
  templateUrl: './card-deslizante.html',
  styleUrl: './card-deslizante.scss',
})
export class CardDeslizante {
  filmes = input.required<FilmeResumo[]>();
  filmeCurtido = output<FilmeResumo>();
  filmeDescurtido = output<FilmeResumo>();
  readonly limiteSwipe = 150;

  deslizarCard(event: CdkDragEnd<any>, index: number) {
    const position = event.source.getFreeDragPosition();
    const x = position.x;

    if (x > this.limiteSwipe) {
      this.curtirFilme(index);
    } else if (x < -this.limiteSwipe) {
      this.descurtirFilme(index);
    } else {
      this.reposicionarCard(event);
    }
  }

  curtirFilme(index: number) {
    this.filmeCurtido.emit(this.filmes()[index]);
  }

  descurtirFilme(index: number) {
    this.filmeDescurtido.emit(this.filmes()[index]);
  }

  reposicionarCard(event: CdkDragEnd) {
    event.source.reset();
  }
}
