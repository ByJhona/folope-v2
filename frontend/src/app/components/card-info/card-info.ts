import { Component, inject, input } from '@angular/core';
import { FilmeResumo } from '../../types/FilmeResumo';
import { Rating } from '../rating/rating';
import { Router } from '@angular/router';

@Component({
  selector: 'folope-card-info',
  imports: [Rating],
  templateUrl: './card-info.html',
  styleUrl: './card-info.scss',
})
export class CardInfo {
  private readonly router = inject(Router);
  filme = input.required<FilmeResumo>();

  buscarDetalhesFilme() {
    this.router.navigate(['/filme', this.filme().id]);
    console.log('Buscar detalhes do filme:', this.filme().id);
  }
}
