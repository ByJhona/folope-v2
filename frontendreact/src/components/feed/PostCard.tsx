import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.curtido);
  const [likesCount, setLikesCount] = useState(post.curtidas);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <article className="glass-card rounded-2xl p-4 md:p-6 animate-fade-in hover-lift">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Link to={`/perfil/${post.usuario.id}`} className="flex items-center gap-3 group">
          <img
            src={post.usuario.avatar}
            alt={post.usuario.nome}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all"
          />
          <div>
            <h4 className="font-semibold group-hover:text-primary transition-colors">
              {post.usuario.nome}
            </h4>
            <p className="text-sm text-muted-foreground">
              @{post.usuario.username} · {formatDistanceToNow(new Date(post.data), { addSuffix: true, locale: ptBR })}
            </p>
          </div>
        </Link>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <p className="text-foreground mb-4 leading-relaxed">
        {post.texto}
      </p>

      {/* Movie Preview */}
      <Link to={`/filme/${post.filme.id}`} className="block mb-4">
        <div className="flex gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group">
          <img
            src={post.filme.urlCapaPoster}
            alt={post.filme.titulo}
            className="w-16 h-24 md:w-20 md:h-28 rounded-lg object-cover"
          />
          <div className="flex-1 flex flex-col justify-center">
            <h5 className="font-display font-semibold group-hover:text-primary transition-colors">
              {post.filme.titulo}
            </h5>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {post.filme.sinopse}
            </p>
            <div className="flex items-center gap-1 mt-2 text-sm text-yellow-500">
              <span>⭐</span>
              <span className="font-medium">{post.filme.nota.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`gap-2 ${liked ? 'text-accent' : 'text-muted-foreground hover:text-accent'}`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
          <MessageCircle className="w-5 h-5" />
          <span>{post.comentariosCount}</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
          <Share2 className="w-5 h-5" />
          <span>Compartilhar</span>
        </Button>
      </div>
    </article>
  );
};
