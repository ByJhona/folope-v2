import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { Sala, Usuario, FilmeResumo } from "@/types"; 
const SOCKET_URL = "http://localhost:8080"; 

export const useSalaSocket = (
  salaCodigo: string | undefined,
  usuario: Usuario | null
) => {
  const [sala, setSala] = useState<Sala | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [matchFound, setMatchFound] = useState<FilmeResumo | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!salaCodigo || !usuario) return;

    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket"],
      query: {
        salaCodigo,
        userId: usuario.id,
      },
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Conectado ao WebSocket:", socket.id);
      setIsConnected(true);

      // 2. Avisar que entrei na sala
      // Envia o objeto usuário completo para o servidor guardar
      socket.emit("join_room", { codigo: salaCodigo, usuario });
    });

    // --- ESCUTANDO EVENTOS DO SERVIDOR ---

    // O servidor manda esse evento sempre que ALGO muda na sala (alguém entrou, saiu, jogo começou)
    socket.on("update_room", (salaAtualizada: Sala) => {
      console.log("Sala atualizada:", salaAtualizada);
      setSala(salaAtualizada);
    });

    // O servidor manda esse evento quando dá Match
    socket.on("match_found", (filme: FilmeResumo) => {
      setMatchFound(filme);
      toast.success(`MATCH! Vocês vão assistir ${filme.titulo}`);
    });

    // Tratamento de Erros
    socket.on("error", (msg: string) => {
      toast.error(msg);
    });

    // Cleanup ao desmontar o componente
    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, [salaCodigo, usuario?.id]);

  // --- AÇÕES QUE O FRONT MANDA PARA O BACK ---

  const iniciarJogo = () => {
    if (socketRef.current && salaCodigo) {
      socketRef.current.emit("start_game", salaCodigo);
    }
  };

  const enviarSwipe = (filmeId: number, direction: "left" | "right") => {
    if (socketRef.current && salaCodigo) {
      socketRef.current.emit("swipe", {
        salaCodigo,
        filmeId,
        liked: direction === "right",
      });
    }
  };

  return {
    sala,
    isConnected,
    matchFound,
    iniciarJogo,
    enviarSwipe,
    resetMatch: () => setMatchFound(null),
  };
};
