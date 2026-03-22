import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Cloud, MapPin, ShieldCheck, History } from 'lucide-react';

/**
 * Vibe Configuration - Extinsă cu note pentru Compoziție Minerală
 */
const VIBE_DATA = {
  STOIC: { 
    motto: "True strength is remaining unmoved while the world screams.", 
    label: "Stability Protocol",
    resilienceNote: "Structural defiance: Absolute.",
    compNote: "Crystalline structure locked in permanent formation."
  },
  CHILL: { 
    motto: "The river flows around the stone; the stone remains at peace.", 
    label: "Resonance Sync",
    resilienceNote: "Erosion accepted as natural polish.",
    compNote: "Loose sedimentary arrangement. Maximum flow."
  },
  STRESSED: { 
    motto: "Tectonic tension detected. Micro-fissure probability: 14%.", 
    label: "Pressure Alert",
    resilienceNote: "Integrity testing required.",
    compNote: "High-density compression. Brittle bonds detected."
  },
  HAPPY: { 
    motto: "Maximum solar absorption achieved. Molecular joy is peak.", 
    label: "Radiance Status", 
    resilienceNote: "Energy levels: Overcharged.",
    compNote: "Vibrant mineral clusters. High quartz resonance."
  },
  SAD: { 
    motto: "Sedimentary depression increasing. Permeability is high.", 
    label: "Erosion Warning", 
    resilienceNote: "Porosity levels rising.",
    compNote: "Dissolving mineral matrix. Porous core."
  },
  ANGRY: { 
    motto: "Igneous flashpoint imminent. Core temperature rising.", 
    label: "Volcanic Risk", 
    resilienceNote: "Thermal resistance: Critical.",
    compNote: "Magmatic instability. Recrystallization in progress."
  },
  EXCITED: { 
    motto: "Molecular rave in progress. Frequency mismatch detected.", 
    label: "Vibrational Peak", 
    resilienceNote: "Vibration dampening: Offline.",
    compNote: "Chaotic atomic drift. Kinetic mineral energy."
  }
};

const mockRock = {
  name: "Petrus",
  vibe: "STOIC" as keyof typeof VIBE_DATA,
  pedigree: "LEGENDARY" as const,
  traits: ["SMART", "LOYAL", "KIND", "CREATIVE", "SHY"],
  erosionLevel: 15,
  numberOfWashes: 82,
  age: 450,
  description: "A silent guardian of the garden path, unmoved by rain or logic.",
  image: "https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?q=80&w=200&h=200&auto=format&fit=crop" 
};

/**
 * Coordonate ajustate pentru a centra pietrele (30% - 65% range)
 */
const PEBBLE_SLOTS = [
  { top: '10%', left: '5%', size: 'w-24 h-20', rotate: 'rotate-[12deg]' },   // Stânga Sus
  { top: '15%', left: '55%', size: 'w-28 h-24', rotate: 'rotate-[45deg]' },   // Dreapta Sus
  { top: '40%', left: '35%', size: 'w-20 h-24', rotate: 'rotate-[-6deg]' },   // Centru (relativ)
  { top: '65%', left: '0%', size: 'w-24 h-24', rotate: 'rotate-[-15deg]' },  // Stânga Jos
  { top: '75%', left: '55%', size: 'w-20 h-16', rotate: 'rotate-[30deg]' },   // Dreapta Jos
  { top: '45%', left: '5%', size: 'w-16 h-20', rotate: 'rotate-[-20deg]' },  // Margine Stânga
];

const Metrics: React.FC = () => {
  const currentVibe = VIBE_DATA[mockRock.vibe] || VIBE_DATA.STOIC;
  const [displayText, setDisplayText] = useState('');
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [userQuote, setUserQuote] = useState('');
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(currentVibe.motto.slice(0, i));
      i++;
      if (i > currentVibe.motto.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [currentVibe.motto]);

  const handleConfirm = () => {
    setUserQuote('');
    setIsEditingQuote(false);
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] p-8 md:p-16 lg:p-24 font-sans flex flex-col items-start overflow-x-hidden">
      
      {showThanks && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#151C2B] text-white px-8 py-4 shadow-2xl z-50 border border-white/10">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
            The rock has heard your message and thanks you.
          </p>
        </div>
      )}

      {/* --- HEADER --- */}
      <h1 className="text-6xl md:text-[120px] font-light uppercase text-[#151C2B] tracking-tighter leading-none relative z-0">Vitality</h1>
      <div className="bg-[#326B52] px-6 py-2 md:py-4 -mt-2 md:-mt-4 relative z-10 inline-block">
        <h2 className="text-6xl md:text-[120px] font-light uppercase text-[#70F5A9] tracking-tighter leading-none">Stasis</h2>
      </div>

      <p className="mt-8 text-lg md:text-xl text-[#4A5565] max-w-2xl leading-relaxed font-medium mb-16">
        Analysis for <span className="text-[#151C2B] font-bold">{mockRock.name}</span>. 
        This <span className="lowercase">{mockRock.pedigree}</span> specimen shows an 
        erosion level of {mockRock.erosionLevel}%. {mockRock.description}
      </p>

      {/* --- PULSE SECTION --- */}
      <div className="w-full max-w-7xl bg-white p-10 md:p-16 shadow-sm border border-gray-100 flex flex-col mb-8">
        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-[#7A8B99] uppercase mb-4">Molecular Pulse</h3>
          <div className="flex items-baseline">
            <span className="text-7xl md:text-[100px] font-black text-[#151C2B] tracking-tighter leading-none">0.0</span>
            <span className="text-2xl md:text-3xl font-medium text-[#151C2B] ml-4">BPM</span>
          </div>
        </div>
        <div className="w-full py-20 md:py-32 flex justify-center items-center">
          <svg viewBox="0 0 1000 100" className="w-full h-12 stroke-[#151C2B]/10 stroke-2 fill-none" preserveAspectRatio="none">
            <path d="M0 50 L1000 50" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full border-t border-gray-50 pt-8">
          <div>
            <h4 className="text-[11px] font-semibold tracking-wider text-[#7A8B99] uppercase mb-1">Current State</h4>
            <span className="text-lg font-bold text-[#151C2B]">PERFECT FLATLINE</span>
          </div>
          <div><span className="text-[11px] font-bold tracking-[0.15em] text-[#326B52] uppercase">Real-Time Sync Active</span></div>
        </div>
      </div>

      {/* --- GRID TOP --- */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        {/* SQUARE 1: CHALLENGE */}
        <div className="bg-[#F4F5F6] p-10 flex flex-col relative overflow-hidden h-[450px]">
          <div className="flex flex-row items-center justify-between mb-8">
            <div className="flex flex-col">
              <h4 className="text-xs font-bold tracking-[0.2em] text-[#7A8B99] uppercase mb-2">{currentVibe.label}</h4>
              <h2 className="text-4xl font-light text-[#151C2B] uppercase tracking-tighter leading-none">{mockRock.vibe} Challenge</h2>
            </div>
            <div className="flex-shrink-0 border-2 border-dashed border-[#A8B8B0] p-1 rounded-full bg-white shadow-inner">
              <img src={mockRock.image} alt="Rock" className="w-14 h-14 object-cover rounded-full grayscale" />
            </div>
          </div>
          <p className="text-sm text-[#151C2B] leading-relaxed uppercase font-black tracking-tighter border-l-2 border-[#151C2B] pl-4 mb-8">
            {displayText}<span className="inline-block w-1.5 h-3 bg-[#151C2B] ml-1 animate-pulse"></span>
          </p>
          {!isEditingQuote ? (
            <div onClick={() => setIsEditingQuote(true)} className="border-2 border-dashed border-[#A8B8B0] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-black/5 transition-colors mt-auto">
              <MoreHorizontal className="w-8 h-8 text-[#8596A6] mb-2" />
              <span className="text-[11px] font-black text-[#151C2B] uppercase tracking-[0.2em]">Submit Quote</span>
            </div>
          ) : (
            <div className="mt-auto flex flex-col space-y-2">
              <textarea autoFocus value={userQuote} onChange={(e) => setUserQuote(e.target.value)} placeholder="Wisdom..." className="w-full h-24 p-4 bg-white border-2 border-[#151C2B] text-sm font-black uppercase tracking-tighter focus:outline-none resize-none" />
              <div className="flex space-x-2">
                <button onClick={handleConfirm} className="flex-1 bg-[#151C2B] text-white text-[10px] font-black py-2 uppercase tracking-[0.2em]">Confirm</button>
                <button onClick={() => setIsEditingQuote(false)} className="px-4 border-2 border-[#151C2B] text-[10px] font-black py-2 uppercase tracking-[0.2em]">X</button>
              </div>
            </div>
          )}
        </div>

        {/* SQUARE 2: ATMOSPHERIC ANALYSIS */}
        <div className="bg-[#E9EDEE] p-10 flex flex-col shadow-sm border border-gray-100 h-[450px]">
          <div className="flex flex-col mb-8">
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#7A8B99] uppercase mb-2">Atmospheric Analysis</h4>
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-light text-[#151C2B] uppercase tracking-tighter">Cloudy</h2>
              <div className="flex flex-col items-end">
                <Cloud className="w-8 h-8 text-[#151C2B]" />
                <div className="flex items-center mt-2 opacity-30">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Bucharest, RO</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow flex flex-col justify-center">
            <p className="text-sm text-[#151C2B] leading-relaxed uppercase font-black tracking-tighter border-l-2 border-[#151C2B] pl-4 italic">
              "Diffused lighting detected. Atmospheric pressure is currently insufficient to crush a rock."
            </p>
          </div>
          <div className="mt-auto pt-6 border-t border-gray-300/50 flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-[#7A8B99] uppercase tracking-widest leading-none">Ambient Temp</span>
              <p className="text-xl font-black text-[#151C2B] leading-tight">14°C</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-[#326B52] uppercase tracking-widest leading-none">System Link</span>
              <p className="text-[10px] font-black text-[#151C2B] uppercase tracking-tight">Geo-Stable</p>
            </div>
          </div>
        </div>

        {/* SQUARE 3: MINERAL COMPOSITION (Cu Text Spiritual) */}
        <div className="bg-white p-10 flex flex-col shadow-sm border border-gray-100 h-[450px]">
          <h4 className="text-xs font-bold tracking-[0.2em] text-[#7A8B99] uppercase mb-4">Mineral Composition</h4>
          
          {/* Noul text spiritual bazat pe Vibe */}
          <div className="mb-6">
            <p className="text-[11px] text-[#151C2B] leading-relaxed uppercase font-black tracking-tighter border-l-2 border-[#151C2B] pl-4">
              {currentVibe.compNote}
            </p>
          </div>

          <div className="relative flex-grow w-full border border-gray-50 rounded-lg bg-[#FDFDFD] overflow-hidden">
            {mockRock.traits.slice(0, 6).map((trait, index) => {
              const slot = PEBBLE_SLOTS[index];
              return (
                <div key={index} style={{ top: slot.top, left: slot.left }} className={`absolute ${slot.size} ${slot.rotate} flex items-center justify-center transition-all duration-500 hover:scale-110 group cursor-default`}>
                  <div className="absolute inset-0 bg-[#D9D9D9] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] shadow-inner border border-gray-200"></div>
                  <span className="relative z-10 text-[10px] font-black text-[#151C2B] uppercase tracking-tighter text-center px-2 leading-none">{trait}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- GRID BOTTOM --- */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* SQUARE 4: RESILIENCE INDEX */}
        <div className="bg-white p-10 md:p-14 border border-gray-100 shadow-sm flex flex-col h-[350px]">
          <div className="flex justify-between items-start mb-6">
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#7A8B99] uppercase">Resilience Index</h4>
            <ShieldCheck className="w-6 h-6 text-[#151C2B]" strokeWidth={1.5} />
          </div>
          <div className="flex-grow flex flex-col justify-center">
            <span className="text-7xl md:text-8xl font-black text-[#151C2B] tracking-tighter leading-none">
              {100 - mockRock.erosionLevel}%
            </span>
            <span className="text-xs font-bold tracking-[0.1em] text-[#7A8B99] uppercase mt-2">Structural Integrity</span>
          </div>
          <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
            <span className="text-[11px] font-black text-[#151C2B] uppercase tracking-wider italic">
              "{currentVibe.resilienceNote}"
            </span>
            <span className="text-[10px] font-bold text-[#326B52] uppercase tracking-widest">Shield Active</span>
          </div>
        </div>

        {/* SQUARE 5: TEMPORAL STANDING */}
        <div className="bg-white p-10 md:p-14 border border-gray-100 shadow-sm flex flex-col h-[350px]">
          <div className="flex justify-between items-start mb-6">
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#7A8B99] uppercase">Temporal Standing</h4>
            <History className="w-6 h-6 text-[#151C2B]" strokeWidth={1.5} />
          </div>
          <div className="flex-grow flex flex-col justify-center">
            <span className="text-7xl md:text-8xl font-black text-[#151C2B] tracking-tighter leading-none">
              {mockRock.age}
            </span>
            <span className="text-xs font-bold tracking-[0.1em] text-[#7A8B99] uppercase mt-2">Years of Stasis</span>
          </div>
          <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
            <span className="text-[11px] font-black text-[#151C2B] uppercase tracking-wider">
              {mockRock.pedigree} Specimen
            </span>
            <span className="text-[10px] font-bold text-[#7A8B99] uppercase tracking-widest">Static Age Logged</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Metrics;