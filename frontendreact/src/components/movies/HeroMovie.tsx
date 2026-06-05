import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Filme } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HeroMovieProps {
  filme: Filme;
}

export const HeroMovie: React.FC<HeroMovieProps> = ({ filme }) => {
const formatDuration = (minutes?: number) => {
  if (!minutes || minutes <= 0) return "0min";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
};


  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={filme?.urlCapaFundo || "#"}
          alt={filme?.titulo || "Titulo"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
              🎬 Destaque da Semana
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {filme?.titulo}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-foreground">{filme?.nota.toFixed(1) || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(filme?.duracao)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {filme?.dataLancamento
                  ? format(new Date(filme.dataLancamento), "d 'de' MMMM, yyyy", { locale: ptBR })
                  : "Data indisponível"}
              </span>         
            </div>
          </div>

          <p className="text-muted-foreground text-lg mb-8 line-clamp-3">
            {filme?.sinopse}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to={`/filme/${filme?.id}`}>
              <Button size="lg" className="btn-gradient-primary hover-glow gap-2">
                <Play className="w-5 h-5" />
                Ver Detalhes
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 hover:border-accent text-accent">
              <Heart className="w-5 h-5" />
              Curtir
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
