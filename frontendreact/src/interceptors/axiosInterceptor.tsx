import { useEffect } from "react";
import { useAuthContext } from "react-oauth2-code-pkce";
import api from "@/services/api";

export const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthContext();
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
            // Lógica de logout ou refresh se quiser
        }
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  return <>{children}</>;
};