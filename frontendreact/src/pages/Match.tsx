import React, { useState, useCallback } from 'react';
import { X, Heart, RotateCcw, Sparkles, Users, Film, Copy, Check, LogIn, Plus, UserCircle2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { filmes } from '@/data/mockData';
import { toast } from 'sonner';

type RoomState = 'lobby' | 'waiting' | 'matching';

interface RoomUser {
  id: string;
  name: string;
  avatar?: string;
}

const generateRoomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const Match = () => {
  const [roomState, setRoomState] = useState<RoomState>('lobby');
  const [roomCode, setRoomCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [users, setUsers] = useState<RoomUser[]>([]);
  
  // Match state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [matches, setMatches] = useState<number[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const [likedFilmes, setLikedFilmes] = useState<number[]>([]);
  const [partnerLiked, setPartnerLiked] = useState<number[]>([]);

  const currentFilme = filmes[currentIndex];

  const handleCreateRoom = () => {
    const code = generateRoomCode();
    setRoomCode(code);
    setUsers([{ id: '1', name: 'Você', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1' }]);
    setRoomState('waiting');
    toast.success('Sala criada!', { description: `Código: ${code}` });
    
    // Simulate partner joining after 3 seconds
    setTimeout(() => {
      setUsers(prev => [...prev, { id: '2', name: 'Parceiro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2' }]);
      toast.success('Alguém entrou na sala!');
    }, 3000);
  };

  const handleJoinRoom = () => {
    if (inputCode.length !== 6) {
      toast.error('Código inválido', { description: 'O código deve ter 6 caracteres' });
      return;
    }
    setRoomCode(inputCode.toUpperCase());
    setUsers([
      { id: '1', name: 'Criador', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1' },
      { id: '2', name: 'Você', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2' }
    ]);
    setRoomState('waiting');
    toast.success('Você entrou na sala!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    toast.success('Código copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStartMatch = () => {
    if (users.length < 2) {
      toast.error('Aguarde outro jogador entrar');
      return;
    }
    // Simulate partner's random likes
    const randomLikes = filmes
      .filter(() => Math.random() > 0.5)
      .map(f => f.id);
    setPartnerLiked(randomLikes);
    setRoomState('matching');
    toast.success('Match iniciado!', { description: 'Deslize para escolher filmes!' });
  };

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    if (direction === 'right') {
      setLikedFilmes((prev) => [...prev, currentFilme.id]);
      
      // Check if partner also liked
      if (partnerLiked.includes(currentFilme.id)) {
        setTimeout(() => {
          setMatches((prev) => [...prev, currentFilme.id]);
          setShowMatch(true);
        }, 400);
      }
    }

    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex((prev) => (prev + 1) % filmes.length);
    }, 400);
  }, [currentFilme, partnerLiked]);

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setLikedFilmes((prev) => prev.slice(0, -1));
    }
  };

  const closeMatchModal = () => {
    setShowMatch(false);
  };

  const handleLeaveRoom = () => {
    setRoomState('lobby');
    setRoomCode('');
    setInputCode('');
    setUsers([]);
    setCurrentIndex(0);
    setMatches([]);
    setLikedFilmes([]);
    setPartnerLiked([]);
    toast.info('Você saiu da sala');
  };

  // Lobby State
  if (roomState === 'lobby') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Match de Filmes</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Encontre filmes em comum
              </h1>
              <p className="text-muted-foreground">
                Crie uma sala ou entre com um código para começar
              </p>
            </div>

            {/* Room Options */}
            <div className="space-y-6">
              {/* Create Room */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Criar Sala</h3>
                    <p className="text-sm text-muted-foreground">Gere um código e convide um amigo</p>
                  </div>
                </div>
                <Button onClick={handleCreateRoom} className="w-full btn-gradient-primary">
                  <Users className="w-4 h-4 mr-2" />
                  Criar Nova Sala
                </Button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">ou</span>
                </div>
              </div>

              {/* Join Room */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <LogIn className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Entrar em Sala</h3>
                    <p className="text-sm text-muted-foreground">Use o código de um amigo</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase().slice(0, 6))}
                    placeholder="CÓDIGO"
                    className="font-mono text-center text-lg tracking-widest uppercase"
                    maxLength={6}
                  />
                  <Button onClick={handleJoinRoom} disabled={inputCode.length !== 6}>
                    Entrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Waiting Room State
  if (roomState === 'waiting') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="w-full max-w-md text-center">
            {/* Room Code Display */}
            <div className="mb-8">
              <p className="text-muted-foreground mb-2">Código da Sala</p>
              <div className="flex items-center justify-center gap-2">
                <div className="px-6 py-4 rounded-2xl bg-card border-2 border-primary/50 font-mono text-3xl tracking-[0.3em] font-bold">
                  {roomCode}
                </div>
                <Button variant="outline" size="icon" onClick={handleCopyCode}>
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            {/* Users in Room */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Participantes ({users.length}/2)</h3>
              <div className="flex justify-center gap-4">
                {[0, 1].map((slot) => {
                  const user = users[slot];
                  return (
                    <div
                      key={slot}
                      className={`w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${
                        user 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border bg-muted/50 animate-pulse'
                      }`}
                    >
                      {user ? (
                        <div className="text-center">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full mx-auto mb-1"
                          />
                          <span className="text-xs font-medium">{user.name}</span>
                        </div>
                      ) : (
                        <UserCircle2 className="w-10 h-10 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
              </div>
              {users.length < 2 && (
                <p className="text-sm text-muted-foreground mt-4 animate-pulse">
                  Aguardando outro jogador...
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleStartMatch}
                disabled={users.length < 2}
                className="w-full btn-gradient-primary"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Iniciar Match
              </Button>
              <Button variant="outline" onClick={handleLeaveRoom} className="w-full">
                Sair da Sala
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Matching State
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-lg bg-card border border-border font-mono text-sm">
              {roomCode}
            </div>
            <div className="flex -space-x-2">
              {users.map((user) => (
                <img
                  key={user.id}
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-background"
                />
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLeaveRoom}>
            Sair
          </Button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Film className="w-5 h-5" />
            <span>{likedFilmes.length} curtidos</span>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Heart className="w-5 h-5 fill-current" />
            <span>{matches.length} matches</span>
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative max-w-md mx-auto h-[450px] md:h-[550px]">
          {/* Background Cards */}
          {filmes.slice(currentIndex + 1, currentIndex + 3).reverse().map((filme, index) => (
            <div
              key={filme.id}
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                transform: `scale(${0.95 - index * 0.05}) translateY(${(index + 1) * 20}px)`,
                zIndex: 10 - index,
                opacity: 0.5 - index * 0.2,
              }}
            >
              <img
                src={filme.urlCapaPoster}
                alt={filme.titulo}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Current Card */}
          {currentFilme && (
            <div
              className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl z-20 transition-all duration-300 ${
                swipeDirection === 'left' ? 'animate-swipe-left' : ''
              } ${swipeDirection === 'right' ? 'animate-swipe-right' : ''}`}
            >
              <img
                src={currentFilme.urlCapaPoster}
                alt={currentFilme.titulo}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

              {/* Swipe Indicators */}
              <div
                className={`absolute top-8 left-8 px-6 py-3 rounded-lg border-4 border-red-500 rotate-[-20deg] transition-opacity ${
                  swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="text-red-500 font-bold text-2xl">NOPE</span>
              </div>
              <div
                className={`absolute top-8 right-8 px-6 py-3 rounded-lg border-4 border-green-500 rotate-[20deg] transition-opacity ${
                  swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="text-green-500 font-bold text-2xl">LIKE</span>
              </div>

              {/* Movie Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary/80 text-primary-foreground text-sm font-medium">
                    ⭐ {currentFilme.nota.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(currentFilme.dataLancamento).getFullYear()}
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  {currentFilme.titulo}
                </h2>
                <p className="text-muted-foreground line-clamp-2">
                  {currentFilme.sinopse}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={handleUndo}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border-2 border-red-500/50"
          >
            <X className="w-8 h-8" />
          </Button>

          <Button
            size="icon"
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500 border-2 border-green-500/50"
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>

        {/* Instructions */}
        <p className="text-center text-muted-foreground text-sm mt-4">
          Clique nos botões para escolher
        </p>
      </div>

      {/* Match Modal */}
      {showMatch && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
          onClick={closeMatchModal}
        >
          <div className="text-center p-8 animate-match">
            <div className="relative mb-6">
              {/* Avatars */}
              <div className="flex justify-center items-center gap-4 mb-4">
                {users.map((user, i) => (
                  <React.Fragment key={user.id}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full border-4 border-primary animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                    {i === 0 && <Heart className="w-8 h-8 text-accent fill-current animate-pulse" />}
                  </React.Fragment>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-3xl opacity-30" />
              <div className="relative">
                <Sparkles className="w-20 h-20 mx-auto text-yellow-500 animate-pulse" />
              </div>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gradient">
              É um Match!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Vocês dois curtiram <span className="text-foreground font-semibold">{currentFilme?.titulo}</span>
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="btn-gradient-primary" onClick={closeMatchModal}>
                Continuar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Match;
