import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'folope-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating implements OnInit {
  id = input<number | undefined>(0);
  nota = input<number | undefined>(0);
  estrelas = [false, false, false, false, false, false, false, false, false];

  ngOnInit() {
    const estrelasAtivas = Math.round(this.nota() ?? 0);
    for (let i = 0; i < this.estrelas.length; i++) {
      this.estrelas[i] = i < estrelasAtivas;
    }
  }
}
