import React, { useState } from 'react';
import { User } from 'lucide-react';

export interface CommentProps {
  id: string;
  content: string;
  createdAt: string;
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
const formatTimeAgo = (dateIsoString: string) => {
  const date = new Date(dateIsoString);
  const diffInHours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
  if (diffInHours < 1) return 'JUST NOW';
  if (diffInHours < 24) return `${diffInHours}H AGO`;
  return `${Math.floor(diffInHours / 24)}D AGO`;
};

const PostComments: React.FC<PostCommentsProps> = ({ postId, initialComments, onCommentAdded }) => {
  const [comments, setComments] = useState<CommentProps[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = (): string | null => {
    const rockRaw = localStorage.getItem('rock');
    if (!rockRaw) {
      return null;
    }

    try {
      const rockData = JSON.parse(rockRaw) as { accessToken?: string };
      return rockData.accessToken ?? null;
    } catch {
      return null;
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    const accessToken = getAccessToken();
    if (!accessToken) {
      setError('Login required to add comments.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content: newComment.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment.');
      }

      const data: {
        comment: {
          id: string;
          content: string;
          createdAt: string;
          commenter: {
            name: string;
            profilePictureUrl?: string | null;
          };
        };
      } = await response.json();

      const newlyAddedComment: CommentProps = {
        id: data.comment.id,
        content: data.comment.content,
        createdAt: data.comment.createdAt,
        commenter: {
          name: data.comment.commenter.name,
          profilePictureUrl: data.comment.commenter.profilePictureUrl ?? null,
        },
      };

      setComments((prev) => [...prev, newlyAddedComment]);
      setNewComment('');
      onCommentAdded();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to post comment.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={!newComment.trim() || isSubmitting}
          className="bg-[#0B132B] text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#00C48C] transition-colors disabled:opacity-50 disabled:hover:bg-[#0B132B]"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </form>

      {error && <p className="text-xs text-red-600 mt-3">{error}</p>}
    </div>
  );
};

export default PostComments;