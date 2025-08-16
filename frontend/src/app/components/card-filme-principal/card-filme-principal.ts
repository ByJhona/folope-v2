import { Component, input } from '@angular/core';
import { FilmeResumo } from '../../types/FilmeResumo';
import { Rating } from '../rating/rating';
import { LucideAngularModule } from 'lucide-angular';
import { TipoCardFilmePrincipal } from '../../types/TipoCardFilmePrincipal';
@Component({
  selector: 'folope-card-filme-principal',
  imports: [Rating, LucideAngularModule],
  templateUrl: './card-filme-principal.html',
  styleUrl: './card-filme-principal.scss',
})
export class CardFilmePrincipal {
  filme = input.required<FilmeResumo>();
  tipo = input.required<TipoCardFilmePrincipal>();

  ngOnInit() {
    console.log('Filme Principal:', this.filme().id);
    console.log('Filme Principal:', this.filme());
  }
}
