import React from 'react';
import { processRsvpData } from './utils';

export function GuestTable({ guests }: { guests: ReturnType<typeof processRsvpData>['guests']; }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dietary Requirements</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {guests.map((guest, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${guest.isAccepted
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'}`}>
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
                <div className="flex gap-1">
                  {guest.vegetarian && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Vegetarian</span>
                  )}
                  {guest.vegan && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Vegan</span>
                  )}
                  {guest.foodAllergies && (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Allergies</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
