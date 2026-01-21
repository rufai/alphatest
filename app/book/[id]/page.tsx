'use client';

import { useState, use } from 'react'; // <-- Import 'use' from React
import { useRouter, useSearchParams } from 'next/navigation';
import { createBooking } from '@/lib/api';
import { Flight } from '@/types/flight';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, User } from 'lucide-react';
import Link from 'next/link';

// Mock data lookup
const allFlights = (require('@/mocks/flights.json') as Flight[]);

// --- UPDATED: params is now a Promise ---
export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  // --- UNWRAP the promise using React.use() ---
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const flight = allFlights.find(f => f.id === resolvedParams.id);
  const passengerCount = parseInt(searchParams.get('passengers') || '1');
  
  const [passengers, setPassengers] = useState(Array(passengerCount).fill({ firstName: '', lastName: '', dob: '' }));
  const [payment, setPayment] = useState({ cardNumber: '', nameOnCard: '', expiry: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!flight) {
    return <div>Flight not found.</div>;
  }

  // ... the rest of the component is the same
  const handlePassengerChange = (index: number, field: string, value: string) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const confirmation = await createBooking({ flightId: flight.id, passengers });
      router.push(confirmation.confirmationUrl);
    } catch (error) {
      console.error("Booking failed", error);
      alert("An error occurred during booking. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleBooking}>
            {/* Passenger Details */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center"><User className="w-5 h-5 mr-2" /> Passenger Details</h2>
              {passengers.map((pax, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-md mb-4">
                  <h3 className="font-medium">Passenger {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" required onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)} className="p-2 border rounded-md" />
                    <input type="text" placeholder="Last Name" required onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)} className="p-2 border rounded-md" />
                  </div>
                  <input type="date" placeholder="Date of Birth" required onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)} className="p-2 border rounded-md w-full" />
                </div>
              ))}
            </div>

            {/* Payment Details */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 flex items-center"><CreditCard className="w-5 h-5 mr-2" /> Payment Details</h2>
              <p className="text-xs text-red-600 font-bold mb-4">DEMO MODE: This is a simulation. Do not enter real card details.</p>
              <input type="text" placeholder="Name on Card" required value={payment.nameOnCard} onChange={(e) => setPayment({...payment, nameOnCard: e.target.value})} className="p-2 border rounded-md w-full mb-4" />
              <input type="text" placeholder="Card Number" required value={payment.cardNumber} onChange={(e) => setPayment({...payment, cardNumber: e.target.value})} className="p-2 border rounded-md w-full mb-4" />
              <input type="text" placeholder="MM/YY" required value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} className="p-2 border rounded-md w-full" />
            </div>

            <Button type="submit" disabled={isProcessing} className="w-full text-lg py-3">
              {isProcessing ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
              {isProcessing ? 'Processing...' : `Confirm & Pay $${flight.price * passengerCount}`}
            </Button>
          </form>
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg shadow sticky top-4">
            <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
            <p className="font-medium">{flight.legs[0].departure.code} → {flight.legs[flight.legs.length - 1].arrival.code}</p>
            <p className="text-sm text-gray-600">{flight.legs[0].airline}</p>
            <div className="border-t my-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Passengers:</span><span>{passengerCount}</span></div>
              <div className="flex justify-between"><span>Base Fare:</span><span>${flight.price * passengerCount}</span></div>
              <div className="flex justify-between"><span>Taxes & Fees:</span><span>$0 (Demo)</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total:</span><span>${flight.price * passengerCount}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}