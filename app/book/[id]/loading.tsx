import { Loader2 } from 'lucide-react';

export default function BookingLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
    </div>
  );
}