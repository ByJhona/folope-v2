import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'folope-navbar',
  imports: [ReactiveFormsModule, LucideAngularModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  pesquisa = new FormControl('');
  constructor(public auth: AuthService) {}
  login() {
    this.auth.loginWithPopup();
  }
  logout() {
    this.logout();
  }
}
