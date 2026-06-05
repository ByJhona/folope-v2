import { Injectable, signal } from '@angular/core';
import { UsuarioInterface } from '../types/UsuarioInterface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly _usuario = signal<UsuarioInterface | null>(null);

  get usuario(): UsuarioInterface | null {
    return this._usuario();
  }

  definirUsuario(usuario: UsuarioInterface | null): void {
    this._usuario.set(usuario);
  }
}
