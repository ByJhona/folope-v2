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
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAuth0({
      domain: env.auth0.domain,
      clientId: env.auth0.clientId,
      authorizationParams: {
        audience: env.auth0.authorizationParams.audience,
        redirect_uri: window.location.origin,
        prompt: 'login',
        ui_locales: 'pt-BR en',
      },
      httpInterceptor: {
        allowedList: [
          `${env.api.serverUrl}/api/privado`,
          `${env.api.serverUrl}/curtidas/existe`,
          `${env.api.serverUrl}/curtidas`,
        ],
      },
    }),
    provideHttpClient(withFetch(), withInterceptors([authHttpInterceptorFn])),
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
