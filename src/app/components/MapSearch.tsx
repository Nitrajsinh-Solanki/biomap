// biomap\src\app\components\MapSearch.tsx


'use client';
import { useState } from 'react';
import axios from 'axios';

interface MapSearchProps {
  onSearch: (lat: number, lng: number) => void;
}

export function MapSearch({ onSearch }: MapSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
 const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
    
  try {
    // using openstreet map api for the location related data 
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: searchQuery,
        format: 'json',
        limit: 1
      }
    });
        
  
    const data = response.data as any[];
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      onSearch(parseFloat(lat), parseFloat(lon));
    } else {
      alert('Location not found. Please try a different search term.');
    }
  } catch (error) {
    console.error('Error searching location:', error);
    alert('Error searching for location. Please try again.');
  }
};

  
  return (
    <form onSubmit={handleSearch} className="mb-4 flex">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search location (e.g., 'Amazon Rainforest')"
        className="text-gray-600 flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button 
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Search
      </button>
    </form>
  );
}
