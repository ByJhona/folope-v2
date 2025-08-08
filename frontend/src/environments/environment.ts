export const environment = {
  production: false,
  auth0: {
    domain: 'dev-lt33tab3beqfm8w6.us.auth0.com',
    clientId: 'G5ka8m7wk3vS3LzM0UnwLYVHqbPWXeDr',
    authorizationParams: {
      audience: 'http://localhost:8080/',
      redirect_uri: 'http://localhost:8080/callback',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: 'http://localhost:8080',
  },
};
