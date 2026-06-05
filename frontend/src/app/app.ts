import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Rodape } from './components/rodape/rodape';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('folope');
}
