import {
  useAuthContext,
  AuthProvider,
  AuthContext,
  IAuthContext,
} from "react-oauth2-code-pkce";
import { useContext } from "react";

import api from "./api";
import { Usuario } from "@/types";

export const authService = {
  async login(): Promise<void> {},

  async cadastrar(): Promise<void> {},

  async logout(): Promise<void> {},

  async getUsuarioAtual(): Promise<Usuario> {
    const response = await api.get<Usuario>("/auth/me");
    return response.data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  },
};
