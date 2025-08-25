import React, { useEffect, useState } from 'react';
import { LuUsers, LuUtensils, LuLeaf, LuTriangleAlert } from 'react-icons/lu';
import { type RsvpData } from './utils';
import { StatCard } from './components/StatCard';
import { ErrorDisplay } from './components/ErrorDisplay';
import { LoginOverlay } from './components/LoginOverlay';
import { GuestTable } from './components/GuestTable';

function App() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState(!localStorage.getItem('auth'));

  const fetchData = async () => {
    try {
      const auth = localStorage.getItem('auth');
      if (!auth) {
        setShowLogin(true);
        return;
      }

      const response = await fetch(import.meta.env.VITE_DATA_ENDPOINT, {
        headers: {
          Authorization: auth
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('auth');
        setShowLogin(true);
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.log(err)
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = () => {
    setShowLogin(false);
    fetchData();
  };

  if (showLogin) {
    return <LoginOverlay onLogin={handleLogin} />;
  }

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

  const attendingGuests = data.filter(g=>g.status ==='attending'|| g.primaryContactId) ??[]

  const stats = {
    totalGuests: attendingGuests.length,
    vegetarianCount: attendingGuests.filter(g=>g.vegetarian).length, 
    veganCount: attendingGuests.filter(g=>g.vegan).length,
     allergiesCount: attendingGuests.filter(g=>g.foodAllergies).length
  }



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">RSVP Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Guests"
            value={stats.totalGuests}
            icon={LuUsers}
          />
          <StatCard
            title="Vegetarian Guests"
            value={stats.vegetarianCount}
            icon={LuUtensils}
          />
          <StatCard
            title="Vegan Guests"
            value={stats.veganCount}
            icon={LuLeaf}
          />
          <StatCard
            title="Food Allergies"
            value={stats.allergiesCount}
            icon={LuTriangleAlert}
          />
        </div>

        <GuestTable guests={data} />
      </div>
    </div>
  );
}

export default App;