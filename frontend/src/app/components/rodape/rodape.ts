import { Component, signal } from '@angular/core';

@Component({
  selector: 'folope-rodape',
  imports: [],
  templateUrl: './rodape.html',
  styleUrl: './rodape.scss',
})
export class Rodape {
  anoAtual = signal(new Date().getFullYear());
}
