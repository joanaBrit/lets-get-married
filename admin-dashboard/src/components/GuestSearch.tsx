import { useState, useMemo } from 'react';
import QRCode from 'qrcode';
import { LuSearch, LuUser } from 'react-icons/lu';

interface Guest {
  pk: string;
  firstName: string;
  lastName: string;
  status?: string;
  primaryContactId?: string;
  bus?: boolean;
}

interface GuestSearchProps {
  guests: Guest[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function GuestSearch({ guests, searchTerm, onSearchChange }: GuestSearchProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [selectedGuestName, setSelectedGuestName] = useState<string>('');

  // Filter guests based on search term (case insensitive)
  const filteredGuests = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const searchLower = searchTerm.toLowerCase();
    return guests.filter(guest => {
      const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
      return fullName.includes(searchLower);
    });
  }, [guests, searchTerm]);

  const generateQRCode = async (guest: Guest) => {
    try {
      const url = `https://joana-david-2025.pages.dev/guest?id=${guest.pk}`;
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(qrDataUrl);
      setSelectedGuestName(`${guest.firstName} ${guest.lastName}`);
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <LuSearch className="mr-2" />
        Guest Search & QR Code Generator
      </h2>
      
      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for a guest by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Search Results */}
      {searchTerm.trim() && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {filteredGuests.length > 0 
              ? `Found ${filteredGuests.length} guest${filteredGuests.length !== 1 ? 's' : ''}:`
              : 'No guests found'
            }
          </h3>
          
          {filteredGuests.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredGuests.map((guest) => (
                <button
                  key={guest.pk}
                  onClick={() => generateQRCode(guest)}
                  className="flex items-center justify-start p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors duration-200 text-left"
                >
                  <LuUser className="mr-2 text-gray-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {guest.firstName} {guest.lastName}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* QR Code Display */}
      {qrCodeUrl && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            QR Code for {selectedGuestName}
          </h3>
          <div className="flex flex-col items-center">
            <img 
              src={qrCodeUrl} 
              alt={`QR Code for ${selectedGuestName}`}
              className="border border-gray-300 rounded-lg shadow-sm"
            />
            <p className="mt-2 text-sm text-gray-600 text-center">
              Scan this QR code to access the guest page
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
