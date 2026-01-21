'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';

export function SearchForm() {
  const router = useRouter();
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('LAX');
  const [departDate, setDepartDate] = useState('2024-10-27');
  const [returnDate, setReturnDate] = useState('2024-11-03');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = () => {
    const params = new URLSearchParams({
      tripType,
      origin,
      destination,
      departDate,
      ...(tripType === 'roundtrip' && { returnDate }),
      passengers: passengers.toString(),
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex space-x-4 mb-4 border-b">
        <button
          className={`pb-2 px-1 ${tripType === 'roundtrip' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setTripType('roundtrip')}
        >
          Round trip
        </button>
        <button
          className={`pb-2 px-1 ${tripType === 'oneway' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setTripType('oneway')}
        >
          One-way
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Depart</label>
          <input type="date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} className="w-full p-2 border rounded-md" />
        </div>
        {tripType === 'roundtrip' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return</label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="w-full p-2 border rounded-md" />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
          <input type="number" value={passengers} min="1" onChange={(e) => setPassengers(parseInt(e.target.value))} className="w-full p-2 border rounded-md" />
        </div>
        <div className="md:col-span-4">
          <Button onClick={handleSearch} className="w-full flex items-center justify-center">
            <Search className="w-5 h-5 mr-2" />
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
}