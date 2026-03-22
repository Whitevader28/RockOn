import React, { useState } from 'react';
import TindrockHeader from '../components/tindrock/TindrockHeader';
import SwipeCard, { TindrockProfile } from '../components/tindrock/SwipeCard';

// Fake profiles to swipe through
const mockProfiles: TindrockProfile[] = [
  {
    id: '1',
    name: 'Quartz',
    ageFormatted: '4 MILLION YEARS OLD',
    // Using a placeholder rock image
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Quartz_Br%C3%A9sil.jpg',
    discoveryPotential: 'Ignore each other.',
  },
  {
    id: '2',
    name: 'Obsidian',
    ageFormatted: '2.5 MILLION YEARS OLD',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Lipari-Obsidienne_%285%29.jpg',
    discoveryPotential: 'Mutual brooding in the dark.',
  },
  {
    id: '3',
    name: 'Granite',
    ageFormatted: '1.2 BILLION YEARS OLD',
    imageUrl: 'https://www.nps.gov/goga/learn/education/images/granite2-copy.jpg',
    discoveryPotential: 'A very dense conversation.',
  }
];

const TindrockPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAction = (action: 'no' | 'connect') => {
    // You could log the action here or trigger an animation
    // console.log(`User selected ${action} for ${mockProfiles[currentIndex].name}`);
    
    // Move to the next rock
    setCurrentIndex((prev) => prev + 1);
  };

  const currentProfile = mockProfiles[currentIndex];

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#0B132B]">
      <TindrockHeader />

      <div className="flex justify-center items-center py-8">
        {currentProfile ? (
          <SwipeCard 
            key={currentProfile.id} 
            profile={currentProfile} 
            onAction={handleAction} 
          />
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4">No more rocks in your quarry.</h3>
            <p className="text-slate-500 mb-8">You have judged them all.</p>
            <button 
              onClick={() => setCurrentIndex(0)}
              className="px-8 py-4 bg-[#0B132B] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#00C48C] transition-colors rounded-sm"
            >
              Reset Geological Epoch
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TindrockPage;