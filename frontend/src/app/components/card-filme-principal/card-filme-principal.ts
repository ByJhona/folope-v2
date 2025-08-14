import { Component, input } from '@angular/core';
import { FilmeResumo } from '../../types/FilmeResumo';

@Component({
  selector: 'folope-card-filme-principal',
  imports: [],
  templateUrl: './card-filme-principal.html',
  styleUrl: './card-filme-principal.scss',
})
export class CardFilmePrincipal {
  filme = input.required<FilmeResumo>();
}
