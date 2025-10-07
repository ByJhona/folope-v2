import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'folope-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class Rating implements OnInit {
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
