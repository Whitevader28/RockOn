import React, { useEffect, useState } from 'react';
import RockProfile from '../components/dashboard/RockProfile';
import CardioHealth from '../components/dashboard/CardioHealth';
import VitalStasis from '../components/dashboard/VitalStasis';
import WisdomQuote from '../components/dashboard/WisdomQuote';

const FALLBACK_ROCK = {
  name: 'Obsidian',
  age: 4200000000,
  erosionLevel: 4,
  staring: 90,
  movement: 0.1,
  profilePictureUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Lipari-Obsidienne_%285%29.jpg",
};

const DashboardPage: React.FC = () => {
  const [rockData, setRockData] = useState(FALLBACK_ROCK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRock = async () => {
      try {
        const rockId = localStorage.getItem('rockId'); // Get rockId from localStorage
        if (!rockId) {
          throw new Error('No rockId found in localStorage. Using fallback data.');
        }

        const res = await fetch(`http://localhost:3000/auth/profile/${rockId}`, {
          headers: {
            'accept': '*/*',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch rock data. Using fallback data.');
        }

        const data = await res.json();
        setRockData(data.rock); // Set the fetched rock data
      } catch (err: any) {
        console.error(err.message);
        setRockData(FALLBACK_ROCK); // Fallback to mock data
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRock();
  }, []);

  if (loading) {
    return <div className="text-center mt-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-16 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#0B132B]">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <RockProfile
          name={rockData.name}
          profilePictureUrl={rockData.profilePictureUrl || FALLBACK_ROCK.profilePictureUrl} // Fallback for profile picture
        />
      </div>

      {/* Other Components */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <CardioHealth age={rockData.age || FALLBACK_ROCK.age} />
        <VitalStasis
          staring={rockData.staring || FALLBACK_ROCK.staring}
          movement={rockData.movement || FALLBACK_ROCK.movement}
          erosionLevel={rockData.erosionLevel || FALLBACK_ROCK.erosionLevel}
        />
        <WisdomQuote traits={rockData.traits || ['WISE']} />
      </div>
    </div>
  );
};

export default DashboardPage;