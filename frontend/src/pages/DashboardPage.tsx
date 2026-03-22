import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RockProfile from '../components/dashboard/RockProfile';
import CardioHealth from '../components/dashboard/CardioHealth';
import VitalStasis from '../components/dashboard/VitalStasis';
import WisdomQuote from '../components/dashboard/WisdomQuote';

const DashboardPage: React.FC = () => {
  const [rockData, setRockData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get the data from local storage
    const storedRock = localStorage.getItem('rock');

    if (storedRock) {
      try {
        const parsedData = JSON.parse(storedRock);
        
        // 2. The backend returns { rock: {...}, accessToken: "..." }
        if (parsedData && parsedData.rock) {
          setRockData(parsedData.rock);
        } else {
          // Data is malformed, send them back to login
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to parse rock data:', error);
        navigate('/');
      }
    } else {
      // 3. No rock data found at all, boot them to the landing page
      navigate('/');
    }
  }, [navigate]);

  // Show a loading state while we pull from local storage
  if (!rockData) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400 text-sm font-bold tracking-widest uppercase">
        Excavating Data...
      </div>
    );
  }

  // Fallback static metrics for the dashboard since these aren't in the DB
  const staringScore = 90;
  const movementScore = 0.1;

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#0B132B]">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <RockProfile 
          name={rockData.name} 
          profilePictureUrl={rockData.profilePictureUrl} 
        />
        <CardioHealth age={rockData.age} />
      </div>

      {/* Middle Section */}
      <VitalStasis 
        staring={staringScore} 
        movement={movementScore} 
        erosionLevel={rockData.erosionLevel} 
      />

      {/* Bottom Section */}
      <WisdomQuote />

    </div>
  );
};

export default DashboardPage;