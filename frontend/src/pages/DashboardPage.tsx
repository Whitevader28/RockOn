import React, { useEffect, useState } from 'react';
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
  profilePictureUrl: null, 
};

const DashboardPage: React.FC = () => {
  const [rockData, setRockData] = useState(mockRockData); // Default to mockRockData
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRockData = async () => {
      try {
        const rockId = localStorage.getItem('rockId'); // Get rockId from localStorage
        if (!rockId) {
          throw new Error('No rockId found in localStorage. Using fallback data.');
        }

        const response = await fetch(`http://localhost:3000/auth/profile/${rockId.replace(/"/g, '')}`, {
          headers: {
            'accept': '*/*',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch rock data. Using fallback data.');
        }

        const data = await response.json();
        setRockData(data.rock); // Set the fetched rock data
      } catch (err: any) {
        console.error(err.message);
        setError(err.message); // Log the error
      } finally {
        setLoading(false);
      }
    };

    fetchRockData();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);

      const rockId = localStorage.getItem('rockId'); // Get the rockId from localStorage
      const accessToken = localStorage.getItem('accessToken'); // Get the accessToken from localStorage

      if (!rockId) {
        throw new Error('No rockId found in localStorage.');
      }
      if (!accessToken) {
        throw new Error('No accessToken found in localStorage.');
      }
      console.log('Uploading profile picture for rockId:', rockId.replace(/"/g, ''));
      const response = await fetch(`http://localhost:3000/auth/profile-picture`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken.replace(/"/g, '')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture.');
      }

      const data = await response.json();
      setRockData((prev) => ({ ...prev, profilePictureUrl: data.profilePictureUrl })); // Update the profile picture URL
    } catch (err: any) {
      console.error(err.message);
      setError('Failed to upload profile picture. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-16">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto font-sans text-[#0B132B]">
      
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {rockData.profilePictureUrl ? (
          <RockProfile name={rockData.name} profilePictureUrl={rockData.profilePictureUrl} />
        ) : (
          <div className="flex flex-col items-center mt-32"> {/* Added margin-top */}
            <label
              htmlFor="upload-button"
              className="px-4 py-2 bg-[#00C48C] text-white font-bold rounded cursor-pointer hover:bg-[#007A5E] transition"
            >
              Upload Picture
            </label>
            <input
              id="upload-button"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        )}
        <CardioHealth age={rockData.age || mockRockData.age} />
      </div>

      {/* Middle Section */}
      <VitalStasis 
        staring={rockData.staring || mockRockData.staring} 
        movement={rockData.movement || mockRockData.movement} 
        erosionLevel={rockData.erosionLevel || mockRockData.erosionLevel} 
      />

      {/* Bottom Section */}
      <WisdomQuote traits={rockData.traits || ['WISE']} />
    </div>
  );
};

export default DashboardPage;