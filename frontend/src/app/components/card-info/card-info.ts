import { Component, input } from '@angular/core';
import { FilmeResumo } from '../../types/FilmeResumo';

@Component({
  selector: 'folope-card-info',
  imports: [],
  templateUrl: './card-info.html',
  styleUrl: './card-info.scss',
})
export class CardInfo {
  filme = input.required<FilmeResumo>();
}
