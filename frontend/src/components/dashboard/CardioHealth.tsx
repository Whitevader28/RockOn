import React from 'react';

const CardioHealth: React.FC<{ age: number }> = ({ age }) => {
  const ageInBillions = (age / 1000000000).toFixed(1);

  return (
    <div className="flex flex-col space-y-6 pt-8">
      <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 flex-grow">
        <h2 className="text-2xl font-light mb-4">Cardiovascular<br />Health</h2>
        <div className="flex items-baseline space-x-2 mb-2">
          <span className="text-7xl font-extrabold text-[#00C48C] tracking-tighter">0</span>
          <span className="text-lg font-bold text-slate-500 tracking-widest">BPM</span>
        </div>
        <p className="text-xs font-semibold text-slate-400 mb-12">(Absolute Nirvana)</p>
        <div className="w-full h-[2px] bg-[#00C48C] rounded-full shadow-[0_0_10px_rgba(0,196,140,0.5)]"></div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-100">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 mb-2 uppercase">Hardness</p>
          <p className="text-2xl font-bold">6.5 <span className="text-xs text-slate-500 tracking-widest">MOHS</span></p>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-100">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 mb-2 uppercase">Age</p>
          <p className="text-2xl font-bold">{ageInBillions} <span className="text-xs text-slate-500 tracking-widest">BN YRS</span></p>
        </div>
      </div>
    </div>
  );
};

export default CardioHealth;