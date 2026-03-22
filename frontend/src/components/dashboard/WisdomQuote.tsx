import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const WisdomQuote: React.FC = () => {
  const [wisdom, setWisdom] = useState<string>("Consulting the sediments...");

  useEffect(() => {
    setTimeout(() => {
      setWisdom("The rock does not seek the summit; the rock is already the summit.");
    }, 800);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-50 border-l-4 border-[#00C48C] p-10 flex flex-col justify-between h-full min-h-[200px]">
        <div>
          <Quote className="text-[#00C48C] w-6 h-6 mb-4" />
          <p className="text-2xl text-slate-600 font-light leading-relaxed transition-opacity duration-500">
            "{wisdom}"
          </p>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="text-[10px] font-bold tracking-widest text-slate-800 uppercase">
            Ancient Sediment Wisdom
          </p>
        </div>
      </div>
    </div>
  );
};

export default WisdomQuote;