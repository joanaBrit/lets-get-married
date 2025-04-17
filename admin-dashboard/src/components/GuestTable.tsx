import React, { useState } from 'react';
import { LuInfo, LuChevronDown, LuChevronRight } from 'react-icons/lu';
import { type ProcessedData } from '../utils';

interface GuestTableProps {
  guests: ProcessedData['guests'];
}

function TableContent({ guests }: { guests: ProcessedData['guests'] }) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {guests.map((guest, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                guest.isAccepted 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {guest.isAccepted ? 'Attending' : 'Not Attending'}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {guest.firstName} {guest.lastName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {guest.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {guest.phone || '-'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-1">
                {guest.vegetarian && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Vegetarian</span>
                )}
                {guest.vegan && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Vegan</span>
                )}
                {guest.foodAllergies && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Allergies</span>
                )}
                {guest.requests && (
                  <div className="relative group">
                    <LuInfo className="w-5 h-5 text-blue-500 cursor-help" />
                    <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-sm rounded p-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2 min-w-[200px] max-w-xs break-words">
                      {guest.requests}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function GuestTable({ guests }: GuestTableProps) {
  const [showDeclined, setShowDeclined] = useState(false);
  const attendingGuests = guests.filter(g => g.isAccepted);
  const notAttendingGuests = guests.filter(g => !g.isAccepted);

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Attending Guests ({attendingGuests.length})</h2>
        </div>
        <TableContent guests={attendingGuests} />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <button 
          onClick={() => setShowDeclined(!showDeclined)}
          className="w-full p-4 border-b border-gray-200 flex items-center justify-between text-left"
        >
          <h2 className="text-lg font-semibold text-gray-900">Not Attending ({notAttendingGuests.length})</h2>
          {showDeclined ? (
            <LuChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <LuChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {showDeclined && <TableContent guests={notAttendingGuests} />}
      </div>
    </div>
  );
}