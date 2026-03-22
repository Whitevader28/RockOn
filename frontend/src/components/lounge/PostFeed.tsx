import React from 'react';
import PostCard, { PostProps } from './PostCard';

const PostFeed: React.FC<{ posts: PostProps[] }> = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;