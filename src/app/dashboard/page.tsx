// biomap\src\app\dashboard\page.tsx

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/Footer';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to BioMap Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Space & Tech Card */}
            <div className="bg-purple-50 rounded-lg p-6 shadow-sm border border-purple-100">
              <h2 className="text-lg font-semibold text-purple-700 mb-3">Space & Tech</h2>
              <p className="text-gray-600 mb-4">
                Explore how space technology is being used to monitor Earth's biodiversity and ecosystem changes from above.
              </p>
              <Link 
                href="/dashboard/space"
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Explore Space Tech
              </Link>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm border border-blue-100">
              <h2 className="text-lg font-semibold text-blue-700 mb-3">Education</h2>
              <p className="text-gray-600 mb-4">
                Access educational resources about biodiversity, conservation, and environmental science for all ages.
              </p>
              <Link 
                href="/dashboard/education"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Learning Resources
              </Link>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-100">
              <h2 className="text-lg font-semibold text-green-700 mb-3">Environment Monitoring</h2>
              <p className="text-gray-600 mb-4">
                Track environmental indicators and changes in ecosystems with our real-time monitoring tools.
              </p>
              <Link 
                href="/dashboard/envmonitor"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Monitor Environment
              </Link>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-6 shadow-sm border border-amber-100">
              <h2 className="text-lg font-semibold text-amber-700 mb-3">Interactive Map</h2>
              <p className="text-gray-600 mb-4">
                Explore our interactive map to visualize biodiversity hotspots and species distribution around the world.
              </p>
              <Link 
                href="/dashboard/map"
                className="inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                Open Interactive Map
              </Link>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6 shadow-sm border border-red-100">
              <h2 className="text-lg font-semibold text-red-700 mb-3">Species</h2>
              <p className="text-gray-600 mb-4">
                Search and discover species from around the world. View detailed information and conservation status.
              </p>
              <Link 
                href="/dashboard/species"
                className="inline-block px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Browse Species
              </Link>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6 shadow-sm border border-teal-100">
              <h2 className="text-lg font-semibold text-teal-700 mb-3">Chemistry</h2>
              <p className="text-gray-600 mb-4">
                Learn about biochemistry, environmental chemistry, and how chemical processes affect biodiversity.
              </p>
              <Link 
                href="/dashboard/chemistry"
                className="inline-block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Explore Chemistry
              </Link>
            </div>
          </div>
        </div>
        
       
      </main>
      
      <Footer />
    </div>
  );
}
