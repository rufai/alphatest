// lib/api.ts
import { Flight } from '../types/flight';

// --- UPDATED: Use dynamic import for reliability ---
async function getAllFlights(): Promise<Flight[]> {
  const flightsModule = await import('@/mocks/flights.json');
  return flightsModule.default as Flight[];
}

export const searchFlights = async (params: {
  origin: string;
  destination: string;
}): Promise<Flight[]> => {
  console.log(`API: Searching for flights from ${params.origin} to ${params.destination}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Fetch the data inside the function
  const allFlights = await getAllFlights();
  console.log(`API: Loaded ${allFlights.length} total flights.`);

  const results = allFlights.filter(flight => {
    const firstLeg = flight.legs[0];
    const lastLeg = flight.legs[flight.legs.length - 1];
    return firstLeg.departure.code === params.origin && lastLeg.arrival.code === params.destination;
  });

  console.log(`API: Found ${results.length} matching flights.`);
  return results;
};

// This function is already robust, but let's ensure it uses the same pattern
export const createBooking = async (details: { flightId: string; passengers: { firstName: string; lastName: string; dob: string; }[] }) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const allFlights = await getAllFlights(); // <-- Use the new helper function
  const flight = allFlights.find(f => f.id === details.flightId);

  if (!flight) {
    throw new Error("Flight not found for booking.");
  }

  const bookingId = Math.random().toString(36).substring(2, 8).toUpperCase();

  return {
    bookingId,
    confirmationUrl: `/confirmation/${bookingId}`,
    flight,
    passengers: details.passengers,
  };
};