import { Component, computed, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TemaService } from '../../services/tema-service';

@Component({
  selector: 'folope-botao-tema',
  imports: [LucideAngularModule],
  templateUrl: './botao-tema.html',
  styleUrl: './botao-tema.scss',
})
export class BotaoTema {
  private readonly temaServ = inject(TemaService);

  temaClaro = computed(() => this.temaServ.temaClaro());

  trocarTema() {
    this.temaServ.trocarTema();
  }
}
