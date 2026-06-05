import { useState } from "react";
import { Users, LogIn, Plus, Film } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { salaService } from "@/services/salaService";

const LobbyPage = () => {
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      const novaSala = await salaService.criarSala();

      toast.success("Sala criada com sucesso!");

      navigate(`/sala/${novaSala.codigo}`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar sala. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (inputCode.length !== 6) {
      toast.error("O código deve ter 6 caracteres");
      return;
    }

    try {
      setLoading(true);

      const sala = await salaService.entrarSala(inputCode);
      toast.success("Você encontrou na sala!");

      navigate(`/sala/${inputCode.toUpperCase()}`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao entrar na sala. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header Visual */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 ring-1 ring-primary/20">
              <Film className="w-4 h-4" />
              <span className="font-medium text-sm">Match</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 tracking-tight">
              Encontre o filme <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                perfeito
              </span>
            </h1>

            <p className="text-muted-foreground text-lg">
              Dê match em filmes com seus amigos e decidam o que assistir sem
              brigas.
            </p>
          </div>

          {/* Área de Ações */}
          <div className="space-y-6">
            {/* Opção 1: Criar Sala */}
            <div className="p-6 rounded-3xl bg-card border shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">Criar Sala</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Gere um código e convide alguém
                  </p>
                </div>
              </div>

              <Button
                onClick={handleCreateRoom}
                disabled={loading}
                className="w-full h-12 text-md font-semibold shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <span className="animate-pulse">Criando...</span>
                ) : (
                  <>
                    <Users className="w-5 h-5 mr-2" />
                    Criar Nova Sala
                  </>
                )}
              </Button>
            </div>

            {/* Divisor "OU" */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase font-medium tracking-widest">
                <span className="bg-background px-4 text-muted-foreground">
                  ou entre agora
                </span>
              </div>
            </div>

            {/* Opção 2: Entrar em Sala */}
            <div className="p-6 rounded-3xl bg-card border shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LogIn className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">
                    Já tem um código?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Entre na sala de um amigo
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Input
                  value={inputCode}
                  onChange={(e) =>
                    setInputCode(e.target.value.toUpperCase().slice(0, 6))
                  }
                  placeholder="X Y Z 1 2 3"
                  className="h-12 font-mono text-center text-lg tracking-[0.2em] uppercase border-2 focus-visible:ring-0 focus-visible:border-primary"
                  maxLength={6}
                />
                <Button
                  onClick={handleJoinRoom}
                  disabled={inputCode.length !== 6}
                  className="h-12 w-24"
                  variant="secondary"
                >
                  Entrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LobbyPage;
