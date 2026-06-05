import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import { FilmeResumo } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MovieCardProps {
  filme: FilmeResumo;
  size?: 'sm' | 'md' | 'lg';
}

export const MovieCard: React.FC<MovieCardProps> = ({ filme, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-32 md:w-40',
    md: 'w-40 md:w-52',
    lg: 'w-52 md:w-64',
  };

  const posterHeight = {
    sm: 'h-48 md:h-60',
    md: 'h-60 md:h-78',
    lg: 'h-78 md:h-96',
  };

  return (
    <Link to={`/filme/${filme.id}`} className={`${sizeClasses[size]} flex-shrink-0 group`}>
      <div className="relative overflow-hidden rounded-xl hover-lift">
        <div className={`${posterHeight[size]} relative`}>
          <img
            src={filme.urlCapaPoster}
            alt={filme.titulo}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-semibold">{filme.nota.toFixed(1)}</span>
          </div>

          {/* Hover Info */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(filme.dataLancamento), 'yyyy', { locale: ptBR })}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-display font-semibold text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors">
          {filme.titulo}
        </h3>
      </div>
    </Link>
  );
};
