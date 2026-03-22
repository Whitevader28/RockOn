import React from 'react';
import { Eye, Navigation, Grid } from 'lucide-react';

const ActivityRing = ({ percentage, icon: Icon, label, subtext }: { percentage: number, icon: any, label: string, subtext: string }) => {
  const strokeDasharray = `${percentage} 100`;
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-32 mb-4">
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          <path className="text-emerald-50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
          <path className="text-[#00C48C] transition-all duration-1000 ease-out" strokeDasharray={strokeDasharray} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#0B132B]">
          <Icon className="w-5 h-5 mb-1 text-slate-700" strokeWidth={1.5} />
          <span className="text-lg font-bold">{percentage}%</span>
        </div>
      </div>
      <h4 className="text-sm font-bold text-[#0B132B] tracking-widest uppercase mb-1">{label}</h4>
      <p className="text-xs text-slate-500 text-center">{subtext}</p>
    </div>
  );
};

interface Props { staring: number; movement: number; erosionLevel: number; }

const VitalStasis: React.FC<Props> = ({ staring, movement, erosionLevel }) => (
  <div className="mb-16">
    <div className="flex items-baseline space-x-4 border-b border-slate-200 pb-4 mb-8">
      <h3 className="text-2xl font-extrabold tracking-tight">Vital Stasis</h3>
      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Activity Measurements in Eon-Time</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white py-8 border border-slate-50 shadow-sm rounded-sm">
      <ActivityRing percentage={staring} icon={Eye} label="Staring" subtext="Optimal gaze duration reached" />
      <ActivityRing percentage={movement} icon={Navigation} label="Movement" subtext="Continental drift detected" />
      <ActivityRing percentage={erosionLevel} icon={Grid} label="Erosion" subtext="Wind patterns are negligible" />
    </div>
  </div>
);

export default VitalStasis;