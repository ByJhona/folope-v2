import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080',

  redirectUri: window.location.origin + '/',
  postLogoutRedirectUri: window.location.origin + '/',
  clientId: 'folope-client',
  responseType: 'code',
  logoutUrl:
    'http://localhost:8080/logout?redirect_uri=' + window.location.origin + '/',

  scope: 'openid profile',

  showDebugInformation: true,
};
