import { Injectable } from '@angular/core';
import { FilmeDescoberta } from '../types/FilmeDescoberta';
import { Observable } from 'rxjs';
import { FilmesResponse } from '../types/FilmesResponse';
import { Filme } from '../types/Filme';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiFolope {
  private readonly apiUrl: string = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) {}

  publico(): Observable<string> {
    return this.httpClient.get<string>(this.apiUrl + '/api' + '/publico', {
      withCredentials: true,
    });
  }
  privado(): Observable<string> {
    return this.httpClient.get<string>(this.apiUrl + '/api' + '/privado', {
      withCredentials: true,
    });
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
