import { Component, input } from '@angular/core';

@Component({
  selector: 'folope-stars',
  imports: [],
  templateUrl: './stars.html',
  styleUrl: './stars.scss',
})
export class Stars {
  id = input.required<number>();
  nota = input.required<number>();
  estrelas = [false, false, false, false, false, false, false, false, false];

  ngOnInit() {
    const estrelasAtivas = Math.round(this.nota());
    for (let i = 0; i < this.estrelas.length; i++) {
      this.estrelas[i] = i < estrelasAtivas;
    }
  }
}
