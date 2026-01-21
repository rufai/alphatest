// app/search/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchFlights } from '@/lib/api';
import { Flight } from '@/types/flight';
import { FlightCard } from '@/components/FlightCard'; // Ensure this is a named import
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      // Get parameters from the URL
      const origin = searchParams.get('origin');
      const destination = searchParams.get('destination');

      // Basic validation
      if (!origin || !destination) {
        setError('Missing search parameters. Please try searching again.');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);

      try {
        // Call our mock API function
        const results = await searchFlights({ origin, destination });
        setFlights(results);
      } catch (e) {
        setError('Failed to fetch flights. Please try again later.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams]); // This effect re-runs whenever the URL search params change

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold text-red-600">Oops!</h2>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  // --- Results State ---
  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
      <aside className="lg:w-1/4">
        {/* FilterSidebar component would go here */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Filters</h3>
          <p className="text-gray-600">Filter components coming soon...</p>
        </div>
      </aside>
      <main className="lg:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Available Flights</h2>
        {flights.length === 0 ? (
          <p className="text-gray-600">No flights found for your search. Try different dates or airports.</p>
        ) : (
          <div className="space-y-4">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}