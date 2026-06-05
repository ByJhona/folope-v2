import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  X,
  Heart,
  Sparkles,
  Copy,
  Check,
  UserCircle2,
  Trophy,
  Loader2,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUsuario } from "@/contexts/UsuarioContext";
import { useSalaSocket } from "@/hooks/use-sala-socket"; // Importe o hook criado acima
import { SalaStatusEnum } from "@/types";

const SalaPage = () => {
  const navigate = useNavigate();
  const { codigo } = useParams<{ codigo: string }>();
  const { usuario } = useUsuario();
  const [copied, setCopied] = useState(false);

  // Estados visuais locais (animações)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null
  );

  // CONECTANDO AO SOCKET
  // O hook faz todo o trabalho sujo de manter o estado 'sala' sincronizado
  const {
    sala,
    isConnected,
    matchFound,
    iniciarJogo,
    enviarSwipe,
    resetMatch,
  } = useSalaSocket(codigo, usuario);

  // Redireciona se tentar acessar sem usuário logado
  useEffect(() => {
    if (!usuario) {
      toast.error("Você precisa estar logado.");
      navigate("/");
    }
  }, [usuario, navigate]);

  // Filmes vêm do objeto sala agora (o backend deve popular isso ao iniciar o jogo)
  // Se o backend não mandar a lista dentro de sala, você precisará de uma chamada API separada aqui.
  // Assumindo que sala.filmesRound existe:
  const filmes = sala?.filmesRound || [];
  const currentFilme = filmes[currentIndex];

  const handleCopyCode = () => {
    if (!codigo) return;
    navigator.clipboard.writeText(codigo);
    setCopied(true);
    toast.success("Código copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (!currentFilme) return;

      setSwipeDirection(direction);

      // Envia pro servidor IMEDIATAMENTE
      enviarSwipe(currentFilme.id, direction);

      // UI Feedback
      setTimeout(() => {
        setSwipeDirection(null);
        setCurrentIndex((prev) => prev + 1);
      }, 400);
    },
    [currentFilme, enviarSwipe]
  );

  // --- RENDER ---

  if (!isConnected || !sala) {
    return (
      <Layout>
        <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Conectando ao servidor...</p>
        </div>
      </Layout>
    );
  }

  // 1. WAITING ROOM (Sincronizada em tempo real)
  if (sala.status === SalaStatusEnum.WAITING) {
    const isOwner = sala.donoId === usuario?.id; // O backend deve mandar quem é o dono

    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          <div className="bg-card p-8 rounded-3xl border shadow-lg w-full max-w-md text-center">
            <span className="uppercase text-xs font-bold tracking-widest text-muted-foreground mb-4 block">
              Sala de Espera
            </span>

            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="text-4xl font-mono font-bold tracking-wider">
                {sala.codigo}
              </div>
              <Button size="icon" variant="ghost" onClick={handleCopyCode}>
                {copied ? <Check className="text-green-500" /> : <Copy />}
              </Button>
            </div>

            <div className="flex justify-center gap-6 mb-8">
              {/* Renderiza a lista REAL de jogadores vindos do servidor */}
              {sala.players.map((player) => (
                <div
                  key={player.id}
                  className="flex flex-col items-center animate-in fade-in zoom-in"
                >
                  <img
                    src={player.avatar}
                    className="w-16 h-16 rounded-full border-2 border-primary"
                    alt={player.nome}
                  />
                  <span className="text-sm mt-2 font-medium">
                    {player.id === usuario?.id ? "Você" : player.nome}
                  </span>
                </div>
              ))}

              {/* Placeholder se tiver só 1 pessoa */}
              {sala.players.length < 2 && (
                <div className="flex flex-col items-center opacity-50 border-dashed border-2 rounded-full p-1 border-muted-foreground/30">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-muted">
                    <Loader2 className="animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {isOwner ? (
              <Button
                className="w-full h-12 text-lg"
                onClick={iniciarJogo}
                disabled={sala.players.length < 2} // O dono sabe que pode clicar aqui pq o array players atualizou sozinho
              >
                <Sparkles className="mr-2 w-5 h-5" /> Iniciar Sessão
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground animate-pulse">
                Aguardando o líder (
                {sala.players.find((p) => p.id === sala.donoId)?.nome})
                iniciar...
              </p>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // 2. MATCHING / GAME
  return (
    <Layout>
      <div className="container mx-auto px-4 py-4 h-[calc(100vh-80px)] flex flex-col max-w-md relative">
        {/* Modal de Match - Disparado pelo WebSocket */}
        {matchFound && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-card w-full max-w-sm rounded-3xl p-6 text-center border-2 border-primary shadow-2xl shadow-primary/20">
              <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4 animate-bounce" />
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                IT'S A MATCH!
              </h2>
              <p className="mb-6 text-xl text-white">Vocês escolheram:</p>

              <img
                src={matchFound.urlCapaPoster}
                className="rounded-lg shadow-lg mb-6 w-2/3 mx-auto"
              />

              <h3 className="text-2xl font-bold mb-6 text-white">
                {matchFound.titulo}
              </h3>

              <Button
                className="w-full btn-gradient-primary text-lg h-12"
                onClick={resetMatch}
              >
                Continuar Jogando
              </Button>
            </div>
          </div>
        )}

        {/* ... Resto do código do Swipe igual ao anterior ... */}
        <div className="relative flex-1 mb-6 w-full">
          {currentFilme ? (
            <div
              className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300
                    ${
                      swipeDirection === "left"
                        ? "-translate-x-full rotate-[-20deg] opacity-0"
                        : ""
                    }
                    ${
                      swipeDirection === "right"
                        ? "translate-x-full rotate-[20deg] opacity-0"
                        : ""
                    }
                `}
            >
              <img
                src={currentFilme.urlCapaPoster}
                className="w-full h-full object-cover"
              />
              {/* ... overlay e textos ... */}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <p>Aguardando o outro jogador terminar...</p>
            </div>
          )}
        </div>

        {/* Botões de Swipe enviam via Socket agora */}
        <div className="flex justify-center gap-6 pb-4">
          <Button
            variant="outline"
            size="icon"
            className="h-16 w-16 rounded-full"
            onClick={() => handleSwipe("left")}
          >
            <X className="w-8 h-8 text-red-500" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600"
            onClick={() => handleSwipe("right")}
          >
            <Heart className="w-8 h-8 text-white fill-current" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SalaPage;
