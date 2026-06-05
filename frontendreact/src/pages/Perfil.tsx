import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MessageCircle, Users, Film, Trophy, Calendar, Edit2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Feed } from '@/components/feed/Feed';
import { MovieCard } from '@/components/movies/MovieCard';
import { usuarios, posts, filmes } from '@/data/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Perfil = () => {
  const { id } = useParams<{ id: string }>();
  const usuario = usuarios.find((u) => u.id === Number(id));
  const [isFollowing, setIsFollowing] = useState(false);

  if (!usuario) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Usuário não encontrado</h1>
          <Link to="/" className="text-primary hover:underline">
            Voltar para o início
          </Link>
        </div>
      </Layout>
    );
  }

  const userPosts = posts.filter((p) => p.usuario.id === usuario.id);
  const filmesCurtidos = filmes.slice(0, 6);

  return (
    <Layout>
      {/* Cover Image */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 via-secondary to-accent/20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
          {/* Avatar */}
          <div className="relative">
            <img
              src={usuario.avatar}
              alt={usuario.nome}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background object-cover shadow-xl"
            />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">
              {usuario.nome}
            </h1>
            <p className="text-muted-foreground text-lg mb-3">@{usuario.username}</p>
            {usuario.bio && (
              <p className="text-foreground mb-4 max-w-xl">{usuario.bio}</p>
            )}

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-6 mb-4">
              <div className="text-center">
                <p className="font-bold text-xl">{usuario.seguidores.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Seguidores</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">{usuario.seguindo.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Seguindo</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl">{usuario.curtidas.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Curtidas</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              className={isFollowing ? 'bg-secondary text-foreground hover:bg-secondary/80' : 'btn-gradient-primary'}
            >
              {isFollowing ? 'Seguindo' : 'Seguir'}
            </Button>
            <Button variant="outline">
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">{usuario.pontuacao.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Pontos</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Heart className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">{usuario.curtidas}</p>
            <p className="text-sm text-muted-foreground">Curtidas</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{usuario.comentarios}</p>
            <p className="text-sm text-muted-foreground">Comentários</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Film className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">{filmesCurtidos.length}</p>
            <p className="text-sm text-muted-foreground">Filmes</p>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="posts" className="mb-8">
          <TabsList className="w-full md:w-auto glass-card">
            <TabsTrigger value="posts" className="flex-1 md:flex-none gap-2">
              <MessageCircle className="w-4 h-4" />
              Publicações
            </TabsTrigger>
            <TabsTrigger value="curtidos" className="flex-1 md:flex-none gap-2">
              <Heart className="w-4 h-4" />
              Curtidos
            </TabsTrigger>
            <TabsTrigger value="atividade" className="flex-1 md:flex-none gap-2">
              <Calendar className="w-4 h-4" />
              Atividade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            {userPosts.length > 0 ? (
              <Feed posts={userPosts} />
            ) : (
              <div className="text-center py-12 glass-card rounded-2xl">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Nenhuma publicação</h3>
                <p className="text-muted-foreground">Este usuário ainda não fez nenhuma publicação</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="curtidos" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filmesCurtidos.map((filme, index) => (
                <div
                  key={filme.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <MovieCard filme={filme} size="md" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="atividade" className="mt-6">
            <div className="space-y-4">
              {[
                { acao: 'Curtiu', filme: filmes[0], tempo: '2 horas atrás' },
                { acao: 'Comentou em', filme: filmes[1], tempo: '5 horas atrás' },
                { acao: 'Curtiu', filme: filmes[2], tempo: '1 dia atrás' },
                { acao: 'Assistiu', filme: filmes[3], tempo: '2 dias atrás' },
              ].map((atividade, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={atividade.filme.urlCapaPoster}
                    alt={atividade.filme.titulo}
                    className="w-12 h-18 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p>
                      <span className="text-muted-foreground">{atividade.acao}</span>{' '}
                      <Link to={`/filme/${atividade.filme.id}`} className="font-semibold hover:text-primary">
                        {atividade.filme.titulo}
                      </Link>
                    </p>
                    <p className="text-sm text-muted-foreground">{atividade.tempo}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Perfil;
