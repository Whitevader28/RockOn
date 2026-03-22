import React from 'react';

export interface TindrockProfile {
  id: string;
  name: string;
  ageFormatted: string;
  imageUrl: string;
  discoveryPotential: string;
}

interface SwipeCardProps {
  profile: TindrockProfile;
  onAction: (action: 'no' | 'connect') => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ profile, onAction }) => {
  return (
    <div className="bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] mx-auto max-w-md w-full overflow-hidden flex flex-col">
      
      {/* Image & Gradient Overlay */}
      <div className="relative w-full aspect-[4/5] bg-black">
        <img 
          src={profile.imageUrl} 
          alt={profile.name} 
          className="w-full h-full object-cover"
        />
        {/* Gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Profile Info */}
        <div className="absolute bottom-0 left-0 p-8">
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            {profile.name}
          </h2>
          <p className="text-[10px] font-bold tracking-[0.2em] text-slate-300 uppercase">
            {profile.ageFormatted}
          </p>
        </div>
      </div>

      {/* Actions & Footer */}
      <div className="p-8 flex flex-col items-center">
        
        {/* Buttons */}
        <div className="flex justify-center space-x-6 w-full mb-8">
          <button 
            onClick={() => onAction('no')}
            className="flex-1 py-4 border border-[#E06B6B] text-[#E06B6B] text-xs font-bold tracking-[0.15em] uppercase hover:bg-red-50 transition-colors"
          >
            No
          </button>
          <button 
            onClick={() => onAction('connect')}
            className="flex-1 py-4 bg-[#00FFC2] text-[#0B132B] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#00E5AE] transition-colors"
          >
            Connect
          </button>
        </div>

        {/* Discovery Potential */}
        <div className="text-center">
          <p className="text-[8px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-2">
            Discovery Potential
          </p>
          <p className="text-sm text-slate-700 font-light">
            Match: {profile.discoveryPotential}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SwipeCard;