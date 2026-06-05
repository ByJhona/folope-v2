import React from 'react';
import { PostCard } from './PostCard';
import { Post } from '@/types';

interface FeedProps {
  posts: Post[];
}

export const Feed: React.FC<FeedProps> = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div
          key={post.id}
          style={{ animationDelay: `${index * 100}ms` }}
          className="animate-slide-up"
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};
