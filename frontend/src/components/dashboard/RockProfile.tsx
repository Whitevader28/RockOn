import React from 'react';

interface Props {
  name: string;
  profilePictureUrl?: string | null;
}

const RockProfile: React.FC<Props> = ({ name, profilePictureUrl }) => (
  <div className="space-y-4">
    <p className="text-xs font-bold tracking-widest text-[#00C48C] uppercase">
      Current Subject
    </p>
    <h1 className="text-7xl font-extrabold tracking-tighter mb-8">{name}.</h1>
    <div className="w-full aspect-[4/3] bg-[#EAEAEA] rounded-sm flex items-center justify-center overflow-hidden">
      {profilePictureUrl ? (
        <img src={profilePictureUrl} alt={`${name}'s profile`} className="w-full h-full object-cover" />
      ) : (
        <div className="w-48 h-24 bg-gradient-to-r from-slate-400 to-slate-500 rounded-t-[100px] rounded-b-[20px] shadow-2xl opacity-80" />
      )}
    </div>
  </div>
);

export default RockProfile;