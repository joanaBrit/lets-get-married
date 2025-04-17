import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-100 rounded-full">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}