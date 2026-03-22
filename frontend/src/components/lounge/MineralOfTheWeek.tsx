import React from 'react';

const MineralOfTheWeek: React.FC = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-sm overflow-hidden shadow-sm">
      <div className="w-full h-48 bg-gradient-to-br from-amber-700 via-orange-300 to-amber-900" />
      <div className="p-6">
        <h4 className="text-xs font-bold tracking-widest text-[#0B132B] uppercase mb-2">
          Mineral of the Week
        </h4>
        <p className="text-xs text-slate-500 mb-6">
          A stunning example of high-pressure metamorphic quartz. Provided by user @CrystalGazer.
        </p>
        <button className="text-[10px] font-bold tracking-widest text-[#00C48C] uppercase hover:text-[#0B132B] transition-colors">
          View Gallery
        </button>
      </div>
    </div>
  );
};

export default MineralOfTheWeek;