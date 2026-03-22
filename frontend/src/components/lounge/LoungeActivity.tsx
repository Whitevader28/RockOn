import React from 'react';

const LoungeActivity: React.FC = () => {
  const chartHeights = [40, 60, 45, 100, 70, 50, 80];

  return (
    <div className="bg-slate-100 p-8 rounded-sm">
      <h4 className="text-xs font-bold tracking-widest text-[#0B132B] uppercase mb-8">
        Lounge Activity
      </h4>
      <div className="flex items-end justify-between h-32 mb-4 space-x-2">
        {chartHeights.map((height, i) => (
          <div 
            key={i} 
            className={`w-full rounded-t-sm ${i === 3 ? 'bg-[#00C48C]' : 'bg-slate-300'}`} 
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Mon</span>
        <span>Sun</span>
      </div>
    </div>
  );
};

export default LoungeActivity;