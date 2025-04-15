
// biomap\src\app\components\EnvironmentLocationSearch.tsx


"use client";
import { useState } from "react";

interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
}

interface EnvironmentLocationSearchProps {
  onLocationSelect: (location: LocationData) => void;
  error: string | null;
  selectedLocation: LocationData | null;
}

export default function EnvironmentLocationSearch({
  onLocationSelect,
  error,
  selectedLocation
}: EnvironmentLocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // search for locations using OpenStreetMap Nominatim API
  const searchLocations = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to search for locations");
      }
      const data = await response.json();
      const locations: LocationData[] = data.map((item: any) => ({
        name: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      }));
      setSearchResults(locations);
    } catch (err) {
      console.error("Error searching for locations:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // handling the  location selection
  const selectLocation = (location: LocationData) => {
    onLocationSelect(location);
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <div className="mb-8">
      {/* search bar */}
      <div className="mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location (city, address, etc.)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
            />
          </div>
          <button
            onClick={searchLocations}
            disabled={isSearching || !searchQuery.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
        {/* search results*/}
        {searchResults.length > 0 && (
          <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-sm max-h-60 overflow-y-auto">
            <ul>
              {searchResults.map((location, index) => (
                <li
                  key={index}
                  className="text-gray-800 px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => selectLocation(location)}
                >
                  {location.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {/* selected location info */}
      {selectedLocation && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-100">
          <h2 className="text-lg font-semibold text-green-800">
            {selectedLocation.name}
          </h2>
          <p className="text-sm text-gray-600">
            Latitude: {selectedLocation.latitude.toFixed(4)}, Longitude:{" "}
            {selectedLocation.longitude.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  );
}
