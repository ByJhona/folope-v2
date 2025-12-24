import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Calendar, Heart, MessageCircle, Play, Share2, Bookmark, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MovieCard } from '@/components/movies/MovieCard';
import { filmes, comentarios, generos, usuarios } from '@/data/mockData';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { filmeService } from '@/services/filmeService';

const FilmeDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newComment, setNewComment] = useState('');

  const [filme, setFilme] = useState(null)

  useEffect(() => {
    filmeService.getFilmeById(id).then(filme => {
      setFilme(filme)
    })
  }, [id])

  if (!filme) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Filme não encontrado</h1>
          <Link to="/" className="text-primary hover:underline">
            Voltar para o início
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const filmeGeneros = generos;
  const filmesRelacionados = filmes;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-[50vh]">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={filme.urlCapaFundo}
            alt={filme.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-24 pb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={filme.urlCapaPoster}
                alt={filme.titulo}
                className="w-48 md:w-64 rounded-2xl shadow-2xl hover-lift"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              {/* Genres */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {filmeGeneros.map((genero) => (
                  <span
                    key={genero.id}
                    className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
                  >
                    {genero.nome}
                  </span>
                ))}
              </div>

              <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
                {filme.titulo}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <span className="text-xl font-bold text-foreground">{filme.nota.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatDuration(filme.duracao)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{format(new Date(filme.dataLancamento), "d 'de' MMMM, yyyy", { locale: ptBR })}</span>
                </div>
              </div>

              {/* Synopsis */}
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                {filme.sinopse}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button size="lg" className="btn-gradient-primary hover-glow gap-2">
                  <Play className="w-5 h-5" />
                  Ver Trailer
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setLiked(!liked)}
                  className={`gap-2 ${liked ? 'border-accent text-accent' : ''}`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Curtido' : 'Curtir'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setSaved(!saved)}
                  className={`gap-2 ${saved ? 'border-primary text-primary' : ''}`}
                >
                  <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                  {saved ? 'Salvo' : 'Salvar'}
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Share2 className="w-5 h-5" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Comments Section */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              Comentários
            </h2>

            {/* New Comment */}
            <div className="glass-card rounded-2xl p-6 mb-6">
              <div className="flex gap-4">
                <img
                  src={usuarios[0].avatar}
                  alt="Seu avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <Textarea
                    placeholder="Compartilhe sua opinião sobre este filme..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px] bg-secondary/50 border-0 resize-none"
                  />
                  <div className="flex justify-end mt-3">
                    <Button className="btn-gradient-primary">
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comentarios.map((comentario) => (
                <div key={comentario.id} className="glass-card rounded-2xl p-6 animate-fade-in">
                  <div className="flex gap-4">
                    <Link to={`/perfil/${comentario.usuario.id}`}>
                      <img
                        src={comentario.usuario.avatar}
                        alt={comentario.usuario.nome}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Link
                          to={`/perfil/${comentario.usuario.id}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {comentario.usuario.nome}
                        </Link>
                        <span className="text-sm text-muted-foreground">
                          · {format(new Date(comentario.data), "d 'de' MMM", { locale: ptBR })}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">{comentario.texto}</p>
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-accent">
                        <Heart className="w-4 h-4" />
                        <span>{comentario.curtidas}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            {/* Movie Stats */}
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h3 className="font-display text-lg font-semibold mb-4">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-secondary/50">
                  <Heart className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <p className="text-2xl font-bold">1.2k</p>
                  <p className="text-sm text-muted-foreground">Curtidas</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-secondary/50">
                  <MessageCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">456</p>
                  <p className="text-sm text-muted-foreground">Comentários</p>
                </div>
              </div>
            </div>

            {/* Related Movies */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold">Filmes Relacionados</h3>
                <Link to="/busca" className="text-sm text-primary hover:underline flex items-center gap-1">
                  Ver mais <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {filmesRelacionados.slice(0, 4).map((f) => (
                  <MovieCard key={f.id} filme={f} size="sm" />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default FilmeDetalhes;
