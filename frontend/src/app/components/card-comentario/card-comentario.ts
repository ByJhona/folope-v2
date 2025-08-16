import { Component, input } from '@angular/core';
import { Comentario } from '../../types/Comentario';

@Component({
  selector: 'folope-card-comentario',
  imports: [],
  templateUrl: './card-comentario.html',
  styleUrl: './card-comentario.scss',
})
export class CardComentario {
  comentario = input.required<Comentario>();

  ngOnInit() {
    console.log('Comentario:', this.comentario().id);
    console.log('Comentario:', this.comentario());
  }
}
