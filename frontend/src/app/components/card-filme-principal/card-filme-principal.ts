import { Component, inject, input, output } from '@angular/core';
import { FilmeResumo } from '../../types/FilmeResumo';
import { Rating } from '../rating/rating';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';
import { SkeletonCardFilmePrincipal } from '../skeleton-card-filme-principal/skeleton-card-filme-principal';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'folope-card-filme-principal',
  imports: [Rating, LucideAngularModule, SkeletonCardFilmePrincipal, DatePipe],
  templateUrl: './card-filme-principal.html',
  styleUrl: './card-filme-principal.scss',
})
export class CardFilmePrincipal {
  router = inject(Router);
  filme = input<FilmeResumo | undefined>();
  usuarioLogado = input<boolean>(false);
  curtido = input<boolean>(false);
  curtiu = output<boolean>();
  desejado = input<boolean>(false);
  desejou = output<boolean>();

  buscarDetalhesFilme() {
    this.router.navigate(['/filme', this.filme()?.id]);
  }

  alterarEstadoCurtida(curtido: boolean) {
    this.curtiu.emit(curtido);
  }

  alterarEstadoDesejo(desejado: boolean) {
    this.desejou.emit(desejado);
  }
}
