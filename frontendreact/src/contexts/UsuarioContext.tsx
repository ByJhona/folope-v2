import { createContext, useContext, useEffect, useState } from "react";
import {  usuarioService } from "@/services/usuarioService";
import { Usuario } from "@/types";
import { AuthContext } from "react-oauth2-code-pkce";

interface UsuarioContextType {
  usuario: Usuario | null;
  loading: boolean;
}

const UsuarioContext = createContext<UsuarioContextType>({} as UsuarioContextType);

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const { token, loginInProgress } = useContext(AuthContext);

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loginInProgress || !token) {
      setUsuario(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    usuarioService.obterUsuario()
      .then((usuario =>{
        console.log(usuario)
        setUsuario(usuario)
      }))
      .finally(() => {setLoading(false)
      });

  }, [token, loginInProgress]);

  return (
    <UsuarioContext.Provider value={{ usuario, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export const useUsuario = () => useContext(UsuarioContext);
