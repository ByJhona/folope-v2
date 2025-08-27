import { TipoCardFilmePrincipal } from '../../types/TipoCardFilmePrincipal';
import { Rating } from './../rating/rating';
import { Component, input } from '@angular/core';

@Component({
  selector: 'folope-skeleton-card-filme-principal',
  imports: [Rating],
  templateUrl: './skeleton-card-filme-principal.html',
  styleUrl: './skeleton-card-filme-principal.scss',
})
export class SkeletonCardFilmePrincipal {
  tipo = input<TipoCardFilmePrincipal>('homePage');
}
