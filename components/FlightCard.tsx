import Link from 'next/link';
import { Flight } from '../types/flight';
import { Plane, Clock } from 'lucide-react';
import { formatDuration, formatTime } from '@/lib/utils';

interface FlightCardProps {
  flight: Flight;
}

/**
 * A card component that displays a summary of a flight.
 * It's a clickable link that navigates the user to the flight's details page.
 */
export function FlightCard({ flight }: FlightCardProps) {
  // Get the first and last legs to determine the overall route
  const firstLeg = flight.legs[0];
  const lastLeg = flight.legs[flight.legs.length - 1];

  // Calculate the total duration of the trip by summing all leg durations
  const totalDuration = flight.legs.reduce((acc, leg) => acc + leg.duration, 0);

  return (
    // The entire card is a link to the dynamic route for this specific flight's ID
    <Link href={`/flights/${flight.id}`}>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-center">
          {/* Left Side: Route and Times */}
          <div className="flex items-center space-x-4">
            <Plane className="h-8 w-8 text-gray-400" />
            <div>
              <p className="text-lg font-semibold">
                {firstLeg.departure.code} → {lastLeg.arrival.code}
              </p>
              <p className="text-sm text-gray-600">
                {formatTime(firstLeg.departureTime)} - {formatTime(lastLeg.arrivalTime)}
              </p>
            </div>
          </div>

          {/* Middle Side: Duration and Stops */}
          <div className="hidden md:block text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center">
              <Clock className="w-4 h-4 mr-1" />
              {formatDuration(totalDuration)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Right Side: Price and Airline */}
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              ${flight.price}
            </p>
            <p className="text-sm text-gray-500">
              {firstLeg.airline}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}