import { Usuario } from './../../types/Usuario';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'folope-navbar',
  imports: [ReactiveFormsModule, LucideAngularModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly rota = inject(Router);
  usuario = signal<Usuario | undefined | null>(undefined);
  pesquisa = new FormControl('');

  login() {
    this.rota.navigate(['/autenticacao']);
  }
}
