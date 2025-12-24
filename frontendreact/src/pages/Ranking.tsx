import React, { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Heart, MessageCircle, Flame } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usuarios } from '@/data/mockData';
import { Link } from 'react-router-dom';

const Ranking = () => {
  const sortedUsers = [...usuarios].sort((a, b) => b.pontuacao - a.pontuacao);
  const top3 = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-7 h-7 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
      case 2:
        return 'from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 3:
        return 'from-amber-600/20 to-orange-600/20 border-amber-600/50';
      default:
        return '';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-500 mb-4">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Ranking</span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-2">
            Hall da Fama
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Os usuários mais ativos e engajados da comunidade Folope
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-4 mb-12">
          {/* 2nd Place */}
          <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '100ms' }}>
            <Link to={`/perfil/${top3[1]?.id}`} className="group">
              <div className="relative">
                <img
                  src={top3[1]?.avatar}
                  alt={top3[1]?.nome}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-gray-400 group-hover:scale-105 transition-transform"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-background font-bold">
                  2
                </div>
              </div>
            </Link>
            <div className={`mt-4 w-24 md:w-32 h-24 md:h-32 rounded-t-2xl bg-gradient-to-b ${getRankColor(2)} border-t border-x flex flex-col items-center justify-center`}>
              {getRankIcon(2)}
              <p className="font-bold text-lg mt-2">{top3[1]?.pontuacao.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">pontos</p>
            </div>
            <p className="font-medium mt-2 text-center text-sm">{top3[1]?.nome}</p>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center animate-slide-up">
            <Link to={`/perfil/${top3[0]?.id}`} className="group">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 opacity-50 blur-md group-hover:opacity-75 transition-opacity" />
                <img
                  src={top3[0]?.avatar}
                  alt={top3[0]?.nome}
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-yellow-500 group-hover:scale-105 transition-transform"
                />
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-background font-bold text-lg">
                  1
                </div>
              </div>
            </Link>
            <div className={`mt-4 w-28 md:w-40 h-32 md:h-44 rounded-t-2xl bg-gradient-to-b ${getRankColor(1)} border-t border-x flex flex-col items-center justify-center`}>
              {getRankIcon(1)}
              <p className="font-bold text-xl mt-2">{top3[0]?.pontuacao.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">pontos</p>
            </div>
            <p className="font-semibold mt-2 text-center">{top3[0]?.nome}</p>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link to={`/perfil/${top3[2]?.id}`} className="group">
              <div className="relative">
                <img
                  src={top3[2]?.avatar}
                  alt={top3[2]?.nome}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-amber-600 group-hover:scale-105 transition-transform"
                />
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-background font-bold text-sm">
                  3
                </div>
              </div>
            </Link>
            <div className={`mt-4 w-20 md:w-28 h-20 md:h-24 rounded-t-2xl bg-gradient-to-b ${getRankColor(3)} border-t border-x flex flex-col items-center justify-center`}>
              {getRankIcon(3)}
              <p className="font-bold mt-1">{top3[2]?.pontuacao.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">pontos</p>
            </div>
            <p className="font-medium mt-2 text-center text-sm">{top3[2]?.nome}</p>
          </div>
        </div>

        {/* Ranking Categories */}
        <Tabs defaultValue="geral" className="max-w-3xl mx-auto">
          <TabsList className="w-full glass-card mb-6">
            <TabsTrigger value="geral" className="flex-1 gap-2">
              <Trophy className="w-4 h-4" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="curtidas" className="flex-1 gap-2">
              <Heart className="w-4 h-4" />
              Curtidas
            </TabsTrigger>
            <TabsTrigger value="comentarios" className="flex-1 gap-2">
              <MessageCircle className="w-4 h-4" />
              Comentários
            </TabsTrigger>
            <TabsTrigger value="semanal" className="flex-1 gap-2">
              <Flame className="w-4 h-4" />
              Semanal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="geral">
            <div className="space-y-3">
              {rest.map((user, index) => (
                <Link
                  key={user.id}
                  to={`/perfil/${user.id}`}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-8 text-center font-bold text-muted-foreground">
                    {index + 4}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.nome}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{user.nome}</p>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{user.pontuacao.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="curtidas">
            <div className="space-y-3">
              {[...usuarios].sort((a, b) => b.curtidas - a.curtidas).map((user, index) => (
                <Link
                  key={user.id}
                  to={`/perfil/${user.id}`}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-8 text-center font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.nome}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{user.nome}</p>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">{user.curtidas.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">curtidas</p>
                  </div>
                  <Heart className="w-5 h-5 text-accent fill-accent" />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comentarios">
            <div className="space-y-3">
              {[...usuarios].sort((a, b) => b.comentarios - a.comentarios).map((user, index) => (
                <Link
                  key={user.id}
                  to={`/perfil/${user.id}`}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="w-8 text-center font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.nome}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{user.nome}</p>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{user.comentarios.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">comentários</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-primary fill-primary" />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="semanal">
            <div className="glass-card rounded-2xl p-8 text-center">
              <Flame className="w-16 h-16 mx-auto mb-4 text-orange-500" />
              <h3 className="font-display text-xl font-bold mb-2">Ranking Semanal</h3>
              <p className="text-muted-foreground mb-6">
                O ranking semanal será atualizado toda segunda-feira. Compita com outros usuários!
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-500">
                <span className="font-medium">Próxima atualização: 6 dias</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* How to Earn Points */}
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="font-display text-2xl font-bold mb-6 text-center">
            Como ganhar pontos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-6 text-center">
              <Heart className="w-10 h-10 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold mb-2">Curtir</h3>
              <p className="text-sm text-muted-foreground">+5 pontos por curtida</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <MessageCircle className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Comentar</h3>
              <p className="text-sm text-muted-foreground">+10 pontos por comentário</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <Trophy className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
              <h3 className="font-semibold mb-2">Match</h3>
              <p className="text-sm text-muted-foreground">+20 pontos por match</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ranking;
