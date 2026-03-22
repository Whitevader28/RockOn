import React, { useState } from 'react';
import { MessageSquare, Triangle } from 'lucide-react';
import PostComments, { CommentProps } from './PostComments';

export interface PostProps {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  upvotes: number;
  comments: CommentProps[];
}

// Helper to format the date for the post
const formatTimeAgo = (dateIsoString: string) => {
  const date = new Date(dateIsoString);
  const diffInHours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
  if (diffInHours < 1) return 'JUST NOW';
  if (diffInHours < 24) return `${diffInHours}H AGO`;
  return `${Math.floor(diffInHours / 24)}D AGO`;
};

const PostCard: React.FC<{ post: PostProps }> = ({ post }) => {
  const [currentUpvotes, setCurrentUpvotes] = useState(post.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments.length);

  const handleUpvote = () => {
    if (hasUpvoted) {
      setCurrentUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    } else {
      setCurrentUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    }
  };

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-[#00C48C] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
          {post.tag}
        </span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {formatTimeAgo(post.createdAt)}
        </span>
      </div>

      <h3 className="text-2xl font-extrabold tracking-tight text-[#0B132B] mb-4">
        {post.title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-8 flex-grow">
        {post.content}
      </p>

      <div className="flex items-center space-x-6 text-xs font-bold text-slate-400">
        <button 
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center space-x-2 transition-colors ${showComments ? 'text-[#0B132B]' : 'hover:text-slate-700'}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{commentCount} COMMENTS</span>
        </button>
        <button
          onClick={() => setShowComments(true)}
          className="text-[10px] uppercase tracking-widest text-[#00C48C] hover:text-[#0B132B] transition-colors"
        >
          Create Comment
        </button>
        <button 
          onClick={handleUpvote}
          className={`flex items-center space-x-2 transition-colors ${hasUpvoted ? 'text-[#00C48C]' : 'hover:text-slate-700'}`}
        >
          <Triangle className={`w-4 h-4 ${hasUpvoted ? 'fill-[#00C48C]' : ''}`} />
          <span>{currentUpvotes} UPVOTES</span>
        </button>
      </div>

      {showComments && (
        <PostComments 
          postId={post.id} 
          initialComments={post.comments} 
          onCommentAdded={() => setCommentCount(prev => prev + 1)} 
        />
      )}
    </div>
  );
};

export default PostCard;