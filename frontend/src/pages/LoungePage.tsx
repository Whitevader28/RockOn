import React from 'react';
import LoungeHeader from '../components/lounge/LoungeHeader';
import PostFeed from '../components/lounge/PostFeed';
import TrendingStrata from '../components/lounge/TrendingStrata';
import MineralOfTheWeek from '../components/lounge/MineralOfTheWeek';
import LoungeActivity from '../components/lounge/LoungeActivity';
import { PostProps } from '../components/lounge/PostCard';

// Temporary mock data. You will replace this with a fetch request to your backend.
// Inside src/pages/LoungePage.tsx
const mockPosts: PostProps[] = [
  {
    id: '1',
    tag: 'URGENT',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    title: 'My rock crăpă, ați mai pățit?',
    content: 'I noticed a small fissure near the northern sedimentary layer. Should I apply mineral oil or is this part of a natural transformation?',
    upvotes: 156,
    comments: [
      {
        id: 'c1',
        content: 'Definitely natural. My limestone did this last millennium.',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        commenter: { name: 'PumiceLover99' }
      }
    ]
  },
  {
    id: '2',
    tag: 'R/HYGIENE',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    title: 'Cat de des o spălați?',
    content: 'Some say daily misting is key, others prefer a deep soak every full moon. What maintains the best surface tension for your granite?',
    upvotes: 892,
    comments: []
  },
  {
    id: '3',
    tag: 'R/ASKERODED',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    title: 'It’s been very silent today, are they okay?',
    content: 'Usually, I feel a vibration from the shelf. Today... nothing. Is this the peak of meditation or should I be worried about soul-drift?',
    upvotes: 34,
    comments: [
      {
        id: 'c2',
        content: 'Silence is the highest form of communication for igneous rocks.',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        commenter: { name: 'MagmaCore' }
      },
      {
        id: 'c3',
        content: 'Check for dust buildup, sometimes that muffles the vibrations.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        commenter: { name: 'SedimentaryMyDearWatson' }
      }
    ]
  },
];

const LoungePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto font-sans text-[#0B132B]">
      <LoungeHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Post Feed */}
        <div className="lg:col-span-2">
          <PostFeed posts={mockPosts} />
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