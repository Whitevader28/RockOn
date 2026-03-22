import React from 'react';

const TindrockHeader: React.FC = () => {
  return (
    <div className="mb-12 text-center md:text-left">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-4 text-[#0B132B]">
        TindRock
      </h1>
      <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
        Curating timeless connections between solid entities. Silence is the only prerequisite for compatibility.
      </p>
    </div>
  );
};

export default TindrockHeader;