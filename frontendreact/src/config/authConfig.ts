import { TAuthConfig } from "react-oauth2-code-pkce";

const authConfig: TAuthConfig = {
  clientId: "folope-client",

  authorizationEndpoint: "http://localhost:8080/oauth2/authorize",
  tokenEndpoint: "http://localhost:8080/oauth2/token",

  redirectUri: window.location.origin + "/",
  scope: "openid profile",

  logoutEndpoint: "http://localhost:8080/connect/logout",
  logoutRedirect: window.location.origin + "/",

  loginMethod: "replace",

  decodeToken: true,
  autoLogin: false,

  storage: "local",
};

export default authConfig;
