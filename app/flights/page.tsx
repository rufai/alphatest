import { notFound } from 'next/navigation';
import { searchFlights } from '@/lib/api';
import { Flight } from '@/types/flight';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, Luggage } from 'lucide-react';
import { formatDuration, formatTime } from '@/lib/utils';

interface PageProps {
  params: { id: string };
  searchParams: { passengers?: string };
}

// Mock data to find the specific flight. In a real app, you'd fetch by ID.
const allFlights = require('@/mocks/flights.json') as Flight[];

export default function FlightDetailsPage({ params, searchParams }: PageProps) {
  const flight = allFlights.find(f => f.id === params.id);

  if (!flight) {
    notFound();
  }

  const passengerCount = parseInt(searchParams.passengers || '1');
  const totalPrice = flight.price * passengerCount;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link href="/search" className="flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to results
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {flight.legs[0].departure.code} → {flight.legs[flight.legs.length - 1].arrival.code}
            </h1>
            <p className="text-gray-600 mt-1">{flight.legs[0].airline}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">${totalPrice}</p>
            <p className="text-sm text-gray-500">Total for {passengerCount} passenger(s)</p>
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <h2 className="text-xl font-semibold">Flight Itinerary</h2>
          {flight.legs.map((leg, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{formatTime(leg.departureTime)}</p>
                <p className="text-sm text-gray-600">{leg.departure.code}</p>
                <p className="text-xs text-gray-500">{leg.departure.city}</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDuration(leg.duration)}
                </p>
                <div className="border-t-2 border-dashed border-gray-300 my-2"></div>
                {index < flight.legs.length - 1 && (
                  <p className="text-xs text-red-600">Layover in {leg.arrival.city}</p>
                )}
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{formatTime(leg.arrivalTime)}</p>
                <p className="text-sm text-gray-600">{leg.arrival.code}</p>
                <p className="text-xs text-gray-500">{leg.arrival.city}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Fare Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center"><Luggage className="w-4 h-4 mr-2 text-gray-500" /> 1 Carry-on bag included</div>
            <div className="flex items-center"><Luggage className="w-4 h-4 mr-2 text-gray-500" /> 1st checked bag: $50</div>
            <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-gray-500" /> Seat selection: $15</div>
          </div>
        </div>

        <div className="mt-8 text-right">
          <Link href={`/book/${flight.id}?passengers=${passengerCount}`}>
            <Button size="lg" className="text-lg px-8">
              Continue to Booking
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}