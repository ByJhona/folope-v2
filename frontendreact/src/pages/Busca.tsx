import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { MovieCard } from '@/components/movies/MovieCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { filmes, generos } from '@/data/mockData';

const Busca = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedGenero, setSelectedGenero] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredFilmes = filmes.filter((filme) => {
    const matchesQuery = filme.titulo.toLowerCase().includes(query.toLowerCase());
    const matchesGenero = selectedGenero ? filme.idGeneros.includes(selectedGenero) : true;
    return matchesQuery && matchesGenero;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Explorar Filmes
          </h1>
          <p className="text-muted-foreground">
            Descubra novos filmes e encontre suas próximas aventuras cinematográficas
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar filmes por título..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-12 text-lg bg-secondary/50 border-0 rounded-xl"
              />
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="h-12 w-12"
              >
                <Grid className="w-5 h-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="h-12 w-12"
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Genre Filters */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filtrar por gênero:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedGenero === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedGenero(null)}
                className="rounded-full"
              >
                Todos
              </Button>
              {generos.map((genero) => (
                <Button
                  key={genero.id}
                  variant={selectedGenero === genero.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedGenero(genero.id)}
                  className="rounded-full"
                >
                  {genero.nome}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          {filteredFilmes.length} {filteredFilmes.length === 1 ? 'filme encontrado' : 'filmes encontrados'}
        </p>

        {/* Results Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredFilmes.map((filme, index) => (
              <div
                key={filme.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MovieCard filme={filme} size="md" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFilmes.map((filme, index) => (
              <div
                key={filme.id}
                className="glass-card rounded-xl p-4 flex gap-4 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={filme.urlCapaPoster}
                  alt={filme.titulo}
                  className="w-24 h-36 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold mb-2">{filme.titulo}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{filme.sinopse}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      ⭐ <span className="font-semibold">{filme.nota.toFixed(1)}</span>
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(filme.dataLancamento).getFullYear()}
                    </span>
                    <span className="text-muted-foreground">
                      {filme.duracao}min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredFilmes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Nenhum filme encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar seus filtros ou buscar por outro termo</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Busca;
