import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = `${env.api.serverUrl}`;
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  login(apelido: string, senha: string): Observable<HttpResponse<any>> {
    return this.http.post(
      this.apiUrl + '/usuario/login',
      { apelido, senha },
      { observe: 'response' }
    );
  }

  atualikzarToken(): Observable<HttpResponse<any>> {
    return this.http.post(
      this.apiUrl + '/usuario/renovar-token',
      {},
      {
        observe: 'response',
        withCredentials: true,
      }
    );
  }

  salvarToken(token: string | null): void {
    if (!token || !isPlatformBrowser(this.platformId)) return;
    const tokenLimpo = token.replace('Bearer ', '');
    localStorage.setItem('token', tokenLimpo);
  }
  obterToken(): string {
    if (!isPlatformBrowser(this.platformId)) return '';
    return localStorage.getItem('token') ?? '';
  }
}
