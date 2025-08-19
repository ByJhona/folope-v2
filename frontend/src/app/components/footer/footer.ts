import { Component, signal } from '@angular/core';

@Component({
  selector: 'folope-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  anoAtual = signal(new Date().getFullYear());
}
