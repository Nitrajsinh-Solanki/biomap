// biomap\src\app\chemistry\page.tsx



'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CompoundSearch from '../components/CompoundSearch';
import PeriodicTable from '../components/PeriodicTable';
import CompoundDetails from '../components/CompoundDetails';

export default function ChemistryPage() {
  const [selectedCompound, setSelectedCompound] = useState<any>(null);
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Chemistry Explorer ⚛️
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Search Chemical Compounds
            </h2>
            <CompoundSearch onCompoundSelect={setSelectedCompound} />
          </div>
          
          {selectedCompound && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <CompoundDetails compound={selectedCompound} />
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Periodic Table of Elements
            </h2>
            <PeriodicTable />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
