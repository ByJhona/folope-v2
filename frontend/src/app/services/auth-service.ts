import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../config/auth.config';
import { CadastroUsuarioInterface } from '../types/CadastroUsuarioInterface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = `${env.api.serverUrl}`;
  private readonly http = inject(HttpClient);
  private readonly oauthServ = inject(OAuthService);

  constructor() {
    this.recuperarContextoAuth();
  }

  private recuperarContextoAuth(): void {
    this.oauthServ.configure(authConfig);
    this.oauthServ.loadDiscoveryDocumentAndTryLogin();
  }

  login(): void {
    if (this.oauthServ.hasValidAccessToken()) {
      console.log('Já logado, não precisa iniciar fluxo');
      return;
    }
    this.oauthServ.initCodeFlow();
  }

  cadastrar(usuario: CadastroUsuarioInterface): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/autenticacao/cadastrar`,
      usuario
    );
  }

  logout(): void {
    this.oauthServ.logOut();
  }

  tokenValido(): boolean {
    return this.oauthServ.hasValidAccessToken();
  }
}
