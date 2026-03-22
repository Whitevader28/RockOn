import React, { useState } from 'react';
import { User } from 'lucide-react';

export interface CommentProps {
  id: string;
  content: string;
  createdAt: Date; // Replaced timeAgo with the actual DB field
  commenter: {
    name: string;
    profilePictureUrl?: string | null;
  };
}

interface PostCommentsProps {
  postId: string;
  initialComments: CommentProps[];
  onCommentAdded: () => void;
}

// Quick helper to format the date
const formatTimeAgo = (date: Date) => {
  const diffInHours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
  if (diffInHours < 1) return 'JUST NOW';
  if (diffInHours < 24) return `${diffInHours}H AGO`;
  return `${Math.floor(diffInHours / 24)}D AGO`;
};

const PostComments: React.FC<PostCommentsProps> = ({ postId, initialComments, onCommentAdded }) => {
  const [comments, setComments] = useState<CommentProps[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newlyAddedComment: CommentProps = {
      id: Math.random().toString(),
      content: newComment,
      createdAt: new Date(), // Stamping it with right now
      commenter: {
        name: 'You (Your Rock)', 
        profilePictureUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEZJVc2wUKe593ai474hSN3SeDoZnvBUEOA&s",
      },
    };

    setComments([...comments, newlyAddedComment]);
    setNewComment('');
    onCommentAdded(); 
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-100">
      <div className="space-y-6 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-slate-200 rounded-sm flex items-center justify-center overflow-hidden">
              {comment.commenter.profilePictureUrl ? (
                <img src={comment.commenter.profilePictureUrl} alt={comment.commenter.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-slate-400" />
              )}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-baseline space-x-2 mb-1">
                <span className="text-xs font-bold text-[#0B132B]">{comment.commenter.name}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {formatTimeAgo(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-slate-600">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} className="flex space-x-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a sedimentary thought..."
          className="flex-grow bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] transition-all"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="bg-[#0B132B] text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#00C48C] transition-colors disabled:opacity-50 disabled:hover:bg-[#0B132B]"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostComments;