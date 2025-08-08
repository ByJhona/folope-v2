import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Auth } from '../../services/auth';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'folope-navbar',
  imports: [ReactiveFormsModule, LucideAngularModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  usuario = signal<User | undefined | null>(undefined);
  pesquisa = new FormControl('');
  constructor(public auth: Auth) {
    auth.obterUsuarioAutenticado().subscribe((usuario) => {
      this.usuario.set(usuario);
    });
  }
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
}
