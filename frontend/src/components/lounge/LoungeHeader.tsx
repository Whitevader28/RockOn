import React from 'react';

const LoungeHeader: React.FC = () => {
  return (
    <div className="mb-12">
      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">
        Discussion Hub
      </p>
      <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-4 text-[#0B132B]">
        Lithic Lounge Forum
      </h1>
      <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
        Where the stoic and the weathered gather. Share your erosion progress, hydration rituals, and the deep, meaningful silences of your companions.
      </p>
    </div>
  );
};

export default LoungeHeader;