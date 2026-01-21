import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

// In a real app, you'd fetch this data using the bookingId
// For the demo, we'll create a plausible mock confirmation object.
const mockConfirmation = {
  bookingId: 'ABC123',
  flight: {
    legs: [{
      departure: { code: 'JFK', city: 'New York' },
      arrival: { code: 'LAX', city: 'Los Angeles' },
      departureTime: '2024-10-27T08:00:00Z',
      airline: 'Alpha Airways',
      flightNumber: 'AA120',
    }]
  },
  passengers: [
    { firstName: 'John', lastName: 'Doe' }
  ]
};

interface PageProps {
  params: { bookingId: string };
}

export default function ConfirmationPage({ params }: PageProps) {
  // For the demo, we'll just use the mock data
  const confirmation = mockConfirmation;

  if (params.bookingId !== confirmation.bookingId) {
    // A simple check to make the dynamic route feel real
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
      <p className="text-xl text-gray-600 mb-6">Your trip is all set. Thank you for choosing Alpha Step Links.</p>

      <div className="bg-white p-6 rounded-lg shadow-md text-left">
        <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
        <div className="space-y-2">
          <p><strong>Confirmation Number (PNR):</strong> <span className="font-mono text-lg">{confirmation.bookingId}</span></p>
          <p><strong>Flight:</strong> {confirmation.flight.legs[0].airline} {confirmation.flight.legs[0].flightNumber}</p>
          <p><strong>Route:</strong> {confirmation.flight.legs[0].departure.code} → {confirmation.flight.legs[0].arrival.code}</p>
          <p><strong>Passenger(s):</strong> {confirmation.passengers.map(p => `${p.firstName} ${p.lastName}`).join(', ')}</p>
        </div>
      </div>

      <div className="mt-8 space-x-4">
        <Link href="/" className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
          Search for another flight
        </Link>
        <Link href="/account" className="inline-block border border-blue-600 text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-blue-50">
          View My Trips
        </Link>
      </div>
    </div>
  );
}