import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HeroMovie } from '@/components/movies/HeroMovie';
import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { Feed } from '@/components/feed/Feed';
import { filmesDestaque, filmesMaisCurtidos, filmesMaisComentados, posts } from '@/data/mockData';
import { Heart, MessageCircle, TrendingUp, Sparkles, Telescope, Search } from 'lucide-react';
import { filmeService } from '@/services/filmeService';

const Index = () => {

  const [filmesEmAlta, setFilmesEmAlta] = useState([])
  const [filmeDestaque, setFilmeDestaque] = useState(null)

  useEffect(() => {
    filmeService.getFilmesPopulares().then(paginacao => {
      const filmes = paginacao.resultados
      setFilmesEmAlta(filmes)
      setFilmeDestaque(filmes[0])
    })
  },[])

  return (
    <Layout>
      {/* Hero Section */}
      <HeroMovie filme={filmeDestaque} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Movie Carousels */}
        <MovieCarousel
          titulo="Filmes em Alta"
          filmes={filmesEmAlta}
          icone={<TrendingUp className="w-6 h-6 text-accent" />}
        />


        {/* Social Feed Section */}
        <section className="py-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2 mb-6">
            <Sparkles className="w-7 h-7 text-primary" />
            Feed Social
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feed */}
            <div className="lg:col-span-2">
              <Feed posts={posts} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Trending Topics */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Trending
                </h3>
                <div className="space-y-3">
                  {['#Duna2', '#Oppenheimer', '#PobresRiaturas', '#Oscars2024', '#CinemaÉVida'].map((topic) => (
                    <div
                      key={topic}
                      className="px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
                    >
                      <span className="text-primary font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who to Follow */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold mb-4">Quem Seguir</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Cinema Lovers', username: 'cinemalovers', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
                    { name: 'Film Critics', username: 'filmcritics', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&q=80' },
                  ].map((user) => (
                    <div key={user.username} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">@{user.username}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                        Seguir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
