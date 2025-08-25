import React from 'react';

export function ErrorDisplay() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">Error fetching from backend</p>
        <button onClick={ ()=>{localStorage.clear()}}>Retry Login</button>
      </div>
      
    </div>
  );
}