import { Component, inject, input, output } from '@angular/core';
import { FilmeResumo } from '../../types/FilmeResumo';
import { Rating } from '../rating/rating';
import { LucideAngularModule } from 'lucide-angular';
import { TipoCardFilmePrincipal } from '../../types/TipoCardFilmePrincipal';
import { Router } from '@angular/router';
import { ApiFolope } from '../../services/api-folope';
import { SkeletonCardFilmePrincipal } from '../skeleton-card-filme-principal/skeleton-card-filme-principal';
@Component({
  selector: 'folope-card-filme-principal',
  imports: [Rating, LucideAngularModule, SkeletonCardFilmePrincipal],
  templateUrl: './card-filme-principal.html',
  styleUrl: './card-filme-principal.scss',
})
export class CardFilmePrincipal {
  router = inject(Router);
  curtidasServ = inject(ApiFolope);
  filme = input.required<FilmeResumo | undefined>();
  tipo = input.required<TipoCardFilmePrincipal>();
  curtido = input<boolean>(false);
  curtiu = output<boolean>();

  buscarDetalhesFilme() {
    this.router.navigate(['/filme', this.filme()?.id]);
  }

  alterarEstadoCurtida(curtido: boolean) {
    this.curtiu.emit(curtido);
  }
}
