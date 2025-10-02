import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MeusIcones } from './icons/icons';
import { routes } from './app.routes';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { autenticacaoInterceptor } from './interceptors/autenticacao-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([autenticacaoInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      })
    ),
    importProvidersFrom(LucideAngularModule.pick(MeusIcones)),
    provideClientHydration(withEventReplay()),
  ],
};
function withInterceptorsAfterFetch(
  arg0: ((
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ) => Observable<HttpEvent<unknown>>)[]
): import('@angular/common/http').HttpFeature<
  import('@angular/common/http').HttpFeatureKind
> {
  throw new Error('Function not implemented.');
}
