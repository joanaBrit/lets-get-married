import { useState, useMemo } from 'react';
import { LuBus, LuChevronDown } from 'react-icons/lu';

interface Guest {
  pk: string;
  firstName: string;
  lastName: string;
  status?: string;
  primaryContactId?: string;
  bus?: boolean;
}

interface BusTransportationProps {
  guests: Guest[];
}

export function BusTransportation({ guests }: BusTransportationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter all guests for bus=true
  const busGuests = useMemo(() => {
    return guests.filter(guest => guest.bus === true);
  }, [guests]);

  // Don't show the section if no bus guests found
  if (busGuests.length === 0) {
    return null;
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-md p-6 mb-8">
      <button
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1 -m-1"
      >
        <h2 className="text-xl font-semibold text-blue-900 flex items-center">
          <LuBus className="mr-2" />
          Guests Requiring Bus Transportation ({busGuests.length})
        </h2>
        <LuChevronDown 
          className={`text-blue-700 text-lg transition-transform duration-200 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      {/* Collapsible Content */}
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? `${busGuests.length * 2.5 + 6}rem` : '0',
          opacity: isExpanded ? 1 : 0,
          marginTop: isExpanded ? '1rem' : '0'
        }}
      >
        <ul className="list-disc list-inside space-y-2">
          {busGuests.map((guest) => (
            <li key={guest.pk} className="text-blue-800 font-medium">
              {guest.firstName} {guest.lastName}
            </li>
          ))}
        </ul>
        
        <p className="mt-4 text-sm text-blue-700">
          All guests who have requested bus transportation.
        </p>
      </div>
    </div>
  );
}
