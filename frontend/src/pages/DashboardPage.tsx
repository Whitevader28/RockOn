import React from 'react';
import RockProfile from '../components/dashboard/RockProfile';
import CardioHealth from '../components/dashboard/CardioHealth';
import VitalStasis from '../components/dashboard/VitalStasis';
import WisdomQuote from '../components/dashboard/WisdomQuote';

const mockRockData = {
  name: 'Obsidian',
  age: 4200000000,
  erosionLevel: 4,
  staring: 90,
  movement: 0.1,
  profilePictureUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Lipari-Obsidienne_%285%29.jpg", 
};

const DashboardPage: React.FC = () => {
  // Eventually you will fetch rock data here instead of using mockRockData

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#0B132B]">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <RockProfile name={mockRockData.name} profilePictureUrl={mockRockData.profilePictureUrl} />
        <CardioHealth age={mockRockData.age} />
      </div>

      {/* Middle Section */}
      <VitalStasis 
        staring={mockRockData.staring} 
        movement={mockRockData.movement} 
        erosionLevel={mockRockData.erosionLevel} 
      />

      {/* Bottom Section */}
      <WisdomQuote />

    </div>
  );
};

export default DashboardPage;