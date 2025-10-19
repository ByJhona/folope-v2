import { Usuario } from './../../types/Usuario';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao-service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'folope-navbar',
  imports: [ReactiveFormsModule, LucideAngularModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly rota = inject(Router);
  readonly autenticacaoServ = inject(AutenticacaoService);
  readonly oAuth = inject(OAuthService);
  usuario = signal<Usuario | undefined | null>(undefined);
  pesquisa = new FormControl('');

  login() {
    this.autenticacaoServ.login();
  }
  cadastrar() {
    this.rota.navigate(['/cadastrar']);
  }
  logout() {
    this.autenticacaoServ.logout();
  }
}
