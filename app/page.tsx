import {SearchForm} from '@/components/SearchForm';
import { Plane } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Plane className="h-12 w-12 text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-900 ml-3">Alpha Step Links</h1>
        </div>
        <p className="text-xl text-gray-600">Find your next adventure, effortlessly.</p>
      </div>
      <SearchForm />
    </main>
  );
}