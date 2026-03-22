import { PostProps } from '../components/lounge/PostCard';

// Preserved reference data for lounge UI development and fallback ideas.
export const loungeMockPosts: PostProps[] = [
  {
    id: '1',
    tag: 'URGENT',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    title: 'My rock crapa, ati mai patit?',
    content:
      'I noticed a small fissure near the northern sedimentary layer. Should I apply mineral oil or is this part of a natural transformation?',
    upvotes: 156,
    comments: [
      {
        id: 'c1',
        content: 'Definitely natural. My limestone did this last millennium.',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        commenter: { name: 'PumiceLover99' },
      },
    ],
  },
  {
    id: '2',
    tag: 'R/HYGIENE',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    title: 'Cat de des o spalati?',
    content:
      'Some say daily misting is key, others prefer a deep soak every full moon. What maintains the best surface tension for your granite?',
    upvotes: 892,
    comments: [],
  },
  {
    id: '3',
    tag: 'R/ASKERODED',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    title: 'It\'s been very silent today, are they okay?',
    content:
      'Usually, I feel a vibration from the shelf. Today... nothing. Is this the peak of meditation or should I be worried about soul-drift?',
    upvotes: 34,
    comments: [
      {
        id: 'c2',
        content: 'Silence is the highest form of communication for igneous rocks.',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        commenter: { name: 'MagmaCore' },
      },
      {
        id: 'c3',
        content: 'Check for dust buildup, sometimes that muffles the vibrations.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        commenter: { name: 'SedimentaryMyDearWatson' },
      },
    ],
  },
];
