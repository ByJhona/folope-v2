import { inject, Injectable } from '@angular/core';
import { Paginacao } from '../types/Paginacao';
import { Observable } from 'rxjs';
import { Filme } from '../types/Filme';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { FilmeResumo } from '../types/FilmeResumo';
import { Comentario } from '../types/Comentario';
import { ImagemFilme } from '../types/ImagemFilme';
import { CurtidaAlvoEnum, Curtida } from '../types/Curtida';
import { Desejo } from '../types/Desejo';

@Injectable({
  providedIn: 'root',
})
export class ApiFolope {
  private readonly apiUrl: string = `${env.api.serverUrl}`;
  private readonly httpClient = inject(HttpClient);

  listarFilmesPopulares(): Observable<Paginacao<FilmeResumo>> {
    return this.httpClient.get<Paginacao<FilmeResumo>>(
      this.apiUrl + '/api/filmes' + '/popular'
    );
  }

  pesquisarFilmeTitulo(
    titulo: string,
    numPagina: number
  ): Observable<Paginacao<FilmeResumo>> {
    return this.httpClient.get<Paginacao<FilmeResumo>>(
      this.apiUrl +
        '/api/filmes' +
        '/buscar/titulo/' +
        titulo +
        '&pagina=' +
        numPagina
    );
  }

  pesquisarFilmeId(id: number): Observable<Filme> {
    return this.httpClient.get<Filme>(
      this.apiUrl + '/api/filmes' + '/id/' + id + '?idioma=pt-BR'
    );
  }

  pesquisarComentariosFilmeId(id: number): Observable<Paginacao<Comentario>> {
    return this.httpClient.get<Paginacao<Comentario>>(
      this.apiUrl + '/api/filmes' + '/id/' + id + '/comentarios'
    );
  }

  pesquisarImagensFilmeId(id: number): Observable<ImagemFilme[]> {
    return this.httpClient.get<ImagemFilme[]>(
      this.apiUrl +
        '/api/filmes' +
        '/id/' +
        id +
        '/imagens' +
        '?idiomaImagem=pt-BR,en'
    );
  }

  salvarDesejo(idFilme: number): Observable<Desejo> {
    return this.httpClient.post<Desejo>(
      this.apiUrl + '/api/desejos',
      {
        idFilme,
      },
      { withCredentials: true }
    );
  }
  removerDesejo(idFilme: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiUrl + '/api/desejos' + '?idFilme=' + idFilme,
      { withCredentials: true }
    );
  }
  buscarExistenciaDesejo(idFilme: number): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.apiUrl + '/api/desejos/existe' + '?idFilme=' + idFilme,
      { withCredentials: true }
    );
  }

  removerCurtida(idAlvo: number, alvo: CurtidaAlvoEnum): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiUrl + '/api/curtidas' + '?idAlvo=' + idAlvo + '&alvo=' + alvo,
      { withCredentials: true }
    );
  }
  salvarCurtida(idAlvo: number, alvo: CurtidaAlvoEnum): Observable<Curtida> {
    console.log('Salvando curtida para', idAlvo, alvo);
    return this.httpClient.post<Curtida>(
      this.apiUrl + '/api/curtidas',
      {
        idAlvo,
        alvo,
      },
      { withCredentials: true }
    );
  }

  buscarExistenciaCurtida(
    idAlvo: number,
    alvo: CurtidaAlvoEnum
  ): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.apiUrl +
        '/api/curtidas/existe' +
        '?idAlvo=' +
        idAlvo +
        '&alvo=' +
        alvo,
      { withCredentials: true }
    );
  }
}
