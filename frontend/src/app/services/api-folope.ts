import { Injectable } from '@angular/core';
import { Paginacao } from '../types/Paginacao';
import { Observable } from 'rxjs';
import { Filme } from '../types/Filme';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { FilmeResumo } from '../types/FilmeResumo';
import { Comentario } from '../types/Comentario';

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

  listarFilmesPopulares(): Observable<Paginacao<FilmeResumo>> {
    return this.httpClient.get<Paginacao<FilmeResumo>>(
      this.apiUrl + '/filme' + '/popular'
    );
  }

  pesquisarFilmeTitulo(
    titulo: string,
    numPagina: number
  ): Observable<Paginacao<FilmeResumo>> {
    return this.httpClient.get<Paginacao<FilmeResumo>>(
      this.apiUrl +
        '/filme' +
        '/buscar/titulo/' +
        titulo +
        '&pagina=' +
        numPagina
    );
  }

  pesquisarFilmeId(id: number): Observable<Filme> {
    return this.httpClient.get<Filme>(this.apiUrl + '/filme' + '/id/' + id);
  }

  pesquisarComentariosFilmeId(id: number): Observable<Paginacao<Comentario>> {
    return this.httpClient.get<Paginacao<Comentario>>(
      this.apiUrl + '/filme' + '/id/' + id + '/comentarios'
    );
  }
}
