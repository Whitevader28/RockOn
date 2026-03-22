import React, { useEffect, useState } from 'react';
import LoungeHeader from '../components/lounge/LoungeHeader';
import PostFeed from '../components/lounge/PostFeed';
import TrendingStrata from '../components/lounge/TrendingStrata';
import MineralOfTheWeek from '../components/lounge/MineralOfTheWeek';
import LoungeActivity from '../components/lounge/LoungeActivity';
import { PostProps } from '../components/lounge/PostCard';

type ApiComment = {
  id: string;
  content: string;
  createdAt: string;
  commenter: {
    name: string;
    profilePictureUrl?: string | null;
  };
};

type ApiPost = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  upvotes: number;
  comments?: ApiComment[];
};

const normalizePost = (post: ApiPost): PostProps => ({
  id: post.id,
  title: post.title,
  content: post.content,
  tag: post.tag,
  createdAt: post.createdAt,
  upvotes: post.upvotes,
  comments: (post.comments ?? []).map((comment) => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    commenter: {
      name: comment.commenter.name,
      profilePictureUrl: comment.commenter.profilePictureUrl ?? null,
    },
  })),
});

const LoungePage: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostTag, setNewPostTag] = useState('R/GENERAL');
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [createPostError, setCreatePostError] = useState<string | null>(null);

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

  const handleCreatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newPostTitle.trim() || !newPostTag.trim() || !newPostContent.trim() || isSubmittingPost) {
      return;
    }

    setCreatePostError(null);
    setIsSubmittingPost(true);

    const accessToken = getAccessToken();
    if (!accessToken) {
      setCreatePostError('Login required to create a post.');
      setIsSubmittingPost(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: newPostTitle.trim(),
          tag: newPostTag.trim(),
          content: newPostContent.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post.');
      }

      const data: { post: ApiPost } = await response.json();
      const createdPost = normalizePost(data.post);

      setPosts((previousPosts) => [createdPost, ...previousPosts]);
      setNewPostTitle('');
      setNewPostTag('R/GENERAL');
      setNewPostContent('');
      setIsCreateOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post.';
      setCreatePostError(message);
    } finally {
      setIsSubmittingPost(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);

        if (!response.ok) {
          throw new Error('Failed to fetch forum posts.');
        }

        const data: ApiPost[] = await response.json();

        if (isMounted) {
          setPosts(data.map(normalizePost));
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'An unexpected error occurred while loading posts.';
          setError(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#0B132B]">
      <LoungeHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Post Feed */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <button
              onClick={() => {
                setCreatePostError(null);
                setIsCreateOpen((previous) => !previous);
              }}
              className="bg-[#0B132B] text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#00C48C] transition-colors"
            >
              {isCreateOpen ? 'Close Composer' : 'Create Post'}
            </button>
          </div>

          {isCreateOpen && (
            <form
              onSubmit={handleCreatePost}
              className="bg-white p-6 rounded-sm shadow-sm border border-slate-100 mb-6 space-y-4"
            >
              <div>
                <label htmlFor="new-post-title" className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">
                  Title
                </label>
                <input
                  id="new-post-title"
                  value={newPostTitle}
                  onChange={(event) => setNewPostTitle(event.target.value)}
                  placeholder="A tectonic thought..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] transition-all"
                />
              </div>

              <div>
                <label htmlFor="new-post-tag" className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">
                  Tag
                </label>
                <input
                  id="new-post-tag"
                  value={newPostTag}
                  onChange={(event) => setNewPostTag(event.target.value)}
                  placeholder="R/GENERAL"
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] transition-all"
                />
              </div>

              <div>
                <label htmlFor="new-post-content" className="block text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">
                  Content
                </label>
                <textarea
                  id="new-post-content"
                  value={newPostContent}
                  onChange={(event) => setNewPostContent(event.target.value)}
                  rows={4}
                  placeholder="Share your latest strata updates..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#00C48C] focus:ring-1 focus:ring-[#00C48C] transition-all resize-y"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={
                    isSubmittingPost ||
                    !newPostTitle.trim() ||
                    !newPostTag.trim() ||
                    !newPostContent.trim()
                  }
                  className="bg-[#0B132B] text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#00C48C] transition-colors disabled:opacity-50 disabled:hover:bg-[#0B132B]"
                >
                  {isSubmittingPost ? 'Posting...' : 'Publish Post'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="border border-slate-300 text-slate-600 px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-slate-400 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {createPostError && <p className="text-xs text-red-600">{createPostError}</p>}
            </form>
          )}

          {isLoading && (
            <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 text-sm text-slate-500">
              Loading lounge forum...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-sm text-sm mb-6">
              {error}
            </div>
          )}

          {!isLoading && !error && <PostFeed posts={posts} />}
        </div>

        {/* Right Column: Sidebar Widgets */}
        <div className="space-y-6">
          <TrendingStrata />
          <MineralOfTheWeek />
          <LoungeActivity />
        </div>
        
      </div>
    </div>
  );
};

export default LoungePage;