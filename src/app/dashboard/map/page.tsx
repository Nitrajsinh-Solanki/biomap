// biomap\src\app\dashboard\map\page.tsx



'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import DashboardNavbar from '../../components/DashboardNavbar';
import Footer from '../../components/Footer';

const MapComponent = dynamic(() => import('../../components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  )
});


export default function MapPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();


//   check authentication and loading the user data 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }
    
    try {
      if (!document.cookie.includes('token=')) {
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
      }
      
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
      return;
    }
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar user={user} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Interactive Biodiversity Explorer</h1>
          
          <Suspense fallback={<div className="h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>}>
            <MapComponent />
          </Suspense>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-100">
            <h2 className="text-lg font-semibold text-green-700 mb-3">Getting Started</h2>
            <p className="text-gray-600 mb-4">
              Welcome to BioMap! This interactive map helps you explore biodiversity data and contribute to conservation efforts.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Use the search bar to find specific locations</li>
              <li>Click "Use My Location" to see biodiversity around you</li>
              <li>Filter species by conservation status</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-6 shadow-sm border border-blue-100">
            <h2 className="text-lg font-semibold text-blue-700 mb-3">Explore Species</h2>
            <p className="text-gray-600 mb-4">
              The map displays individual species observations as green markers. Click on any marker to view detailed information about the species.
            </p>
            <p className="text-gray-600">
              The size of each marker indicates the number of observations of that species in the area.
            </p>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-6 shadow-sm border border-amber-100">
            <h2 className="text-lg font-semibold text-amber-700 mb-3">Biodiversity Hotspots</h2>
            <p className="text-gray-600 mb-4">
              The map highlights areas with high species concentration as biodiversity hotspots.
            </p>
            <div className="flex items-center mt-2">
              <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
              <span className="mr-3 text-gray-600">Biodiversity hotspot</span>
              <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1 text-gray-600"></span>
              <span className='text-gray-600'>Major hotspot</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl mb-4 text-gray-900 font-bold">About This Map</h2>
          <p className="text-gray-700 mb-4">
            This interactive biodiversity mapping tool allows you to explore species distribution and 
            biodiversity hotspots around the world. The data is sourced from the Global Biodiversity 
            Information Facility (GBIF) API, providing real-time information about species occurrences.
          </p>
          <p className="text-gray-700">
            The application demonstrates how geolocation data can be combined with biodiversity information 
            to create an interactive tool for exploring and understanding species distribution patterns 
            around the world. This can help researchers, conservationists, and the public better understand 
            biodiversity patterns and support conservation efforts.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
