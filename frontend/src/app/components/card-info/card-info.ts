import { Component, input } from '@angular/core';
import { FilmeResumo } from '../../types/FilmeResumo';
import { Stars } from '../stars/stars';

@Component({
  selector: 'folope-card-info',
  imports: [Stars],
  templateUrl: './card-info.html',
  styleUrl: './card-info.scss',
})
export class CardInfo {
  filme = input.required<FilmeResumo>();
}
