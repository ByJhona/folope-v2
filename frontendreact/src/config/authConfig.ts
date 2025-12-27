import { TAuthConfig } from "react-oauth2-code-pkce";

const authConfig: TAuthConfig = {
  clientId: "folope-client",

  authorizationEndpoint: "http://localhost:8080/oauth2/authorize",
  tokenEndpoint: "http://localhost:8080/oauth2/token",

  redirectUri: window.location.origin + "/",
  scope: "openid profile offline_access",

  logoutEndpoint: "http://localhost:8080/connect/logout",
  logoutRedirect: window.location.origin + "/",

  loginMethod: "replace",

  decodeToken: true,
  autoLogin: false,

  storage: "local",

  preLogin: () => {
    localStorage.setItem("POST_LOGIN_REDIRECT_URL", window.location.pathname);
  },
  postLogin: () => {
    const redirectUrl = localStorage.getItem("POST_LOGIN_REDIRECT_URL");
    if (redirectUrl && redirectUrl !== "/") {
      localStorage.removeItem("POST_LOGIN_REDIRECT_URL");
      window.history.replaceState({}, "", redirectUrl);
    }
  },
};

export default authConfig;
