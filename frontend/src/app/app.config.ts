import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MeusIcones } from './icons/icons';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { autenticacaoInterceptor } from './interceptors/autenticacao-interceptor';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';

registerLocaleData(localeBr);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { timezone: '-0300' } },
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    provideOAuthClient(),
    provideHttpClient(withFetch(), withInterceptors([autenticacaoInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      })
    ),
    importProvidersFrom(LucideAngularModule.pick(MeusIcones)),
  ],
};
