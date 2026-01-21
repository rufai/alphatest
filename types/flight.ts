export interface Airport {
  code: string;
  city: string;
  name: string;
}

export interface Leg {
  departure: Airport;
  arrival: Airport;
  departureTime: string; // ISO 8601 format
  arrivalTime: string;   // ISO 8601 format
  duration: number;      // in minutes
  airline: string;
  flightNumber: string;
  aircraft: string;
}

export interface Flight {
  id: string;
  price: number;
  currency: string;
  legs: Leg[];
  stops: number;
}