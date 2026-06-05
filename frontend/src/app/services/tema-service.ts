import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  temaClaro = signal<boolean>(false);

  constructor() {
    this.resgatarPreferenciaTema();
  }

  trocarTema(): void {
    this.temaClaro.update((estado) => !estado);
    localStorage.setItem('temaClaro', this.temaClaro().toString());
  }

  resgatarPreferenciaTema(): void {
    const temaClaro = localStorage.getItem('temaClaro') === 'true';
    this.temaClaro.set(temaClaro);
  }
}
