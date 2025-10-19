import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao-service';
import { OAuthService } from 'angular-oauth2-oidc';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'folope-navbar',
  imports: [ReactiveFormsModule, LucideAngularModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  readonly autenticacaoServ = inject(AutenticacaoService);
  readonly oAuth = inject(OAuthService);
  private readonly usuarioServ = inject(UsuarioService);
  usuario = computed(() => this.usuarioServ.usuario);

  pesquisa = new FormControl('');

  login() {
    this.autenticacaoServ.login();
  }
  logout() {
    this.autenticacaoServ.logout();
  }
}
