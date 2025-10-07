import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = `${env.api.serverUrl}`;
  private readonly http = inject(HttpClient);
  login(apelido: string, senha: string): Observable<HttpResponse<any>> {
    return this.http.post(
      this.apiUrl + '/usuario/login',
      { apelido, senha },
      { observe: 'response' }
    );
  }

  salvarToken(token: string | null): void {
    if (!token) return;
    const tokenLimpo = token.replace('Bearer ', '');
    localStorage.setItem('token', tokenLimpo);
  }
  obterToken(): string {
    return localStorage.getItem('token') ?? '';
  }
}
