import { createRoot } from "react-dom/client";
import { AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce";
import App from "./App";
import "./index.css";
import authConfig from "./config/authConfig";
import { AxiosInterceptor } from "./interceptors/axiosInterceptor";


createRoot(document.getElementById("root")!).render(
  <AuthProvider authConfig={authConfig}>
    <AxiosInterceptor>
      <App />
    </AxiosInterceptor>
  </AuthProvider>
);
