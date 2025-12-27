import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, Sun, Moon, Film, Trophy, Gamepad2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';
import { AuthContext, useAuthContext } from "react-oauth2-code-pkce";
import { useUsuario } from '@/contexts/UsuarioContext';


export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const {logIn, logOut, token, loginInProgress} = useContext(AuthContext)
  const {usuario} = useUsuario()


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl btn-gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Film className="w-6 h-6" />
            </div>
            <span className="font-display text-2xl font-bold hidden sm:block">
              Folope
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Feed
            </Link>
            <Link to="/busca" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Explorar
            </Link>
            <Link to="/lobby" className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
              <Gamepad2 className="w-4 h-4" />
              Match
            </Link>
            <Link to="/ranking" className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              Ranking
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center max-w-xs w-full">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar filmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-0 focus-visible:ring-primary"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>


          {!token ? (
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => logIn()}
            >
              Entrar
            </Button>

            <Button
              className="btn-gradient-primary hover-glow"
              onClick={() => logIn()}
            >
              Cadastrar
            </Button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/perfil/1" className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">
                {usuario?.nome ||
                "Usuário"}
              </span>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => logOut()}
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar filmes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-0"
                />
              </div>
            </form>

            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Feed
              </Link>
              <Link
                to="/busca"
                className="px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link
                to="/match"
                className="px-4 py-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gamepad2 className="w-4 h-4" />
                Match
              </Link>
              <Link
                to="/ranking"
                className="px-4 py-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Trophy className="w-4 h-4" />
                Ranking
              </Link>
              <Link
                to="/perfil/1"
                className="px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Meu Perfil
              </Link>
              <hr className="border-border my-2" />
              <div className="flex gap-2 px-4">
                <Button variant="outline" className="flex-1">
                  Entrar
                </Button>
                <Button className="flex-1 btn-gradient-primary">
                  Cadastrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
