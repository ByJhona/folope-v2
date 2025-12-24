import { useEffect } from "react";
import { useAuthContext } from "react-oauth2-code-pkce";
import api from "@/services/api";

export const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthContext();

  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => api.interceptors.request.eject(interceptor);
  }, [token]);

  return <>{children}</>;
};