import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth-service';
import { jwtDecode } from 'jwt-decode';

function isTokenExpirado(token: string): boolean {
  if (!token) return false;
  const agora = Math.floor(Date.now() / 1000);

  const expiracaoToken: number = jwtDecode(token).exp ?? 0;
  return agora >= expiracaoToken;
}

export function autenticacaoInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authServ = inject(AuthService);

  const token = authServ.obterToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        const token = event.headers.get('authorization');
        authServ.salvarToken(token);
      }
    })
  );
}
