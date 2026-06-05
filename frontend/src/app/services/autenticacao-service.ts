import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../config/auth.config';
import { UsuarioService } from './usuario-service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private readonly usuarioServ = inject(UsuarioService);
  private readonly oauthServ = inject(OAuthService);

  constructor() {
    this.recuperarContextoAuth();
  }

  private recuperarContextoAuth(): void {
    this.oauthServ.configure(authConfig);
    this.oauthServ.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.definirUsuario();
    });
  }

  entrar(): void {
    if (this.oauthServ.hasValidAccessToken()) {
      console.warn('Já logado, não precisa iniciar fluxo');
      return;
    }
    this.oauthServ.initCodeFlow();
  }

  sair(): void {
    this.oauthServ.logOut();
  }

  tokenValido(): boolean {
    return this.oauthServ.hasValidAccessToken();
  }

  definirUsuario(): void {
    if (this.tokenValido() === false) return;
    const claims = this.oauthServ.getIdentityClaims();
    if (!claims) return;

    const nomeUsuario = claims['sub'];
    this.usuarioServ.definirUsuario({ nomeUsuario: nomeUsuario });
  }
}
