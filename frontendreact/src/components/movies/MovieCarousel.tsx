import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FilmeResumo } from '@/types';
import { MovieCard } from './MovieCard';

interface MovieCarouselProps {
  titulo: string;
  filmes: FilmeResumo[];
  icone?: React.ReactNode;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({ titulo, filmes, icone }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl md:text-2xl font-bold flex items-center gap-2">
          {icone}
          {titulo}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="rounded-full h-8 w-8 md:h-10 md:w-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="rounded-full h-8 w-8 md:h-10 md:w-10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
      >
        {filmes.map((filme) => (
          <MovieCard key={filme.id} filme={filme} />
        ))}
      </div>
    </section>
  );
};
