import { Component, inject, input } from '@angular/core';
import { FilmeResumo } from '../../types/FilmeResumo';
import { Rating } from '../rating/rating';
import { LucideAngularModule } from 'lucide-angular';
import { TipoCardFilmePrincipal } from '../../types/TipoCardFilmePrincipal';
import { Router } from '@angular/router';
import { ApiFolope } from '../../services/api-folope';
import { CurtidaAlvoEnum } from '../../types/Curtida';
@Component({
  selector: 'folope-card-filme-principal',
  imports: [Rating, LucideAngularModule],
  templateUrl: './card-filme-principal.html',
  styleUrl: './card-filme-principal.scss',
})
export class CardFilmePrincipal {
  router = inject(Router);
  curtidasServ = inject(ApiFolope);
  filme = input.required<FilmeResumo>();
  tipo = input.required<TipoCardFilmePrincipal>();
  curtiu = false;

  buscarDetalhesFilme() {
    this.router.navigate(['/filme', this.filme()?.id]);
  }

  curtirFilme() {
    this.curtidasServ
      .salvarCurtida(this.filme().id, CurtidaAlvoEnum.FILME)
      .subscribe((curtida) => {});
  }

  buscarExistenciaCurtida() {
    this.curtidasServ
      .buscarExistenciaCurtida(this.filme().id, CurtidaAlvoEnum.FILME)
      .subscribe((existe) => {
        this.curtiu = existe;
      });
  }
}
