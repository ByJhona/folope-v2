import { Component, inject, input } from '@angular/core';
import { FilmeResumo } from '../../types/FilmeResumo';
import { Rating } from '../rating/rating';
import { LucideAngularModule } from 'lucide-angular';
import { TipoCardFilmePrincipal } from '../../types/TipoCardFilmePrincipal';
import { Router } from '@angular/router';
@Component({
  selector: 'folope-card-filme-principal',
  imports: [Rating, LucideAngularModule],
  templateUrl: './card-filme-principal.html',
  styleUrl: './card-filme-principal.scss',
})
export class CardFilmePrincipal {
  router = inject(Router);
  filme = input.required<FilmeResumo>();
  tipo = input.required<TipoCardFilmePrincipal>();

  ngOnInit() {
    console.log('Filme Principal:', this.filme()?.id);
    console.log('Filme Principal:', this.filme());
  }

  buscarDetalhesFilme() {
    this.router.navigate(['/filme', this.filme()?.id]);
    console.log('Buscar detalhes do filme:', this.filme()?.id);
  }
}
