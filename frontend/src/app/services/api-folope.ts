import { Injectable } from '@angular/core';
import { FilmeDescoberta } from '../types/FilmeDescoberta';
import { Observable } from 'rxjs';
import { FilmesResponse } from '../types/FilmesResponse';
import { Filme } from '../types/Filme';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiFolope {
  private readonly apiUrl: string = `${env.api.serverUrl}`;
  constructor(private readonly httpClient: HttpClient) {}

  publico(): Observable<string> {
    return this.httpClient.get<string>(this.apiUrl + '/api' + '/publico');
  }
  privado(): Observable<string> {
    return this.httpClient.get<string>(this.apiUrl + '/api' + '/privado');
  }

  listarFilmes(): Observable<FilmeDescoberta[]> {
    return this.httpClient.get<FilmeDescoberta[]>(
      this.apiUrl + '/filme' + '/buscar',
      {
        withCredentials: true,
      }
    );
  }

  pesquisarFilmeTitulo(
    titulo: string,
    numPagina: number
  ): Observable<FilmesResponse> {
    return this.httpClient.get<FilmesResponse>(
      this.apiUrl +
        '/filme' +
        '/buscar/titulo?titulo=' +
        titulo +
        '&pagina=' +
        numPagina,
      { withCredentials: true }
    );
  }

  pesquisarFilmeId(id: number): Observable<Filme> {
    return this.httpClient.get<Filme>(
      this.apiUrl + '/filme' + '/buscar/id?id=' + id,
      {
        withCredentials: true,
      }
    );
  }
}
