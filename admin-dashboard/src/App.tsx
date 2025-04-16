import React, { useEffect, useState } from 'react';
import { LuUsers as Users, LuUtensils as  Utensils, LuLeaf as Leaf, LuTriangleAlert as  AlertTriangle } from 'react-icons/lu';
import { type RsvpData, processRsvpData } from './utils';
import { GuestTable } from './GuestTable';
import { StatCard } from './StatCard';

function ErrorDisplay() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">Error fetching from backend</p>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState<RsvpData[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_DATA_ENDPOINT, {headers: {Authorization: import.meta.env.VITE_TOKEN}});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <ErrorDisplay />;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const { guests, stats } = processRsvpData(data);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">RSVP Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Guests" 
            value={stats.totalGuests} 
            icon={Users}
          />
          <StatCard 
            title="Vegetarian Guests" 
            value={stats.vegetarianCount} 
             icon={Utensils}
          />
          <StatCard 
            title="Vegan Guests" 
            value={stats.veganCount} 
            icon={Leaf}
          />
          <StatCard 
            title="Food Allergies" 
            value={stats.allergiesCount} 
            icon={AlertTriangle}
          />
        </div>

        <GuestTable guests={guests} />
      </div>
    </div>
  );
}

export default App;