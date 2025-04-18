// biomap\src\app\dashboard\chemistry\page.tsx

'use client';

import { useState, useEffect } from 'react';
import DashboardNavbar from '../../components/DashboardNavbar';
import CompoundSearch from '../../components/CompoundSearch';
import PeriodicTable from '../../components/PeriodicTable';
import CompoundDetails from '../../components/CompoundDetails';

export default function DashboardChemistryPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedCompound, setSelectedCompound] = useState<any>(null);
  
  useEffect(() => {
    // getting user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar user={user} />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Chemistry Explorer ⚛️</h1>
          <p className="text-gray-600 mt-2">
            Search for chemical compounds, explore their properties, and view molecular structures
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Chemical Compounds
            </h2>
            <CompoundSearch onCompoundSelect={setSelectedCompound} />
          </div>
          
          {selectedCompound && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <CompoundDetails compound={selectedCompound} />
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Periodic Table of Elements
            </h2>
            <PeriodicTable />
          </div>
        </div>
      </div>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            Data provided by PubChem PUG REST API
          </p>
        </div>
      </footer>
    </div>
  );
}
