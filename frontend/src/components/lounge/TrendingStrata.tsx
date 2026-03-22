import React from 'react';

const TrendingStrata: React.FC = () => {
  const trends = [
    { tag: '#IgneousIntimacy', count: '1.2K' },
    { tag: '#SedimentSoul', count: '892' },
    { tag: '#TectonicTalk', count: '441' },
  ];

  return (
    <div className="bg-[#0B132B] text-white p-8 rounded-sm">
      <h4 className="text-xs font-bold tracking-widest text-[#00C48C] uppercase mb-6">
        Trending Strata
      </h4>
      <div className="space-y-4 mb-8">
        {trends.map((item) => (
          <div key={item.tag} className="flex justify-between items-center">
            <span className="text-sm font-bold">{item.tag}</span>
            <span className="text-xs text-slate-400">{item.count}</span>
          </div>
        ))}
      </div>
      <button className="w-full py-3 border border-slate-700 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#0B132B] transition-colors">
        Explore All
      </button>
    </div>
  );
};

export default TrendingStrata;