import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Folope - Home',
  },

  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./pages/cadastro-page/cadastro-page').then((m) => m.CadastroPage),
    title: 'Folope - Login',
  },
  {
    path: 'filme/:id',
    loadComponent: () =>
      import('./pages/filme-page/filme-page').then((m) => m.FilmePage),
    title: 'Folope - Filme',
  },
  { path: '**', component: NotFoundPage, title: 'Folope - Not Found' },
];
