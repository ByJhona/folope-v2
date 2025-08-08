import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private readonly _auth: AuthService) {}

  login() {
    this._auth.loginWithRedirect();
  }
  logout() {
    this._auth.logout({
      logoutParams: {
        federated: true,
        returnTo: window.location.origin,
      },
    });
  }

  obterEstadoUsuarioAutenticado(): Observable<boolean> {
    return this._auth.isAuthenticated$;
  }

  obterUsuarioAutenticado(): Observable<User | undefined | null> {
    return this._auth.user$;
  }
}
