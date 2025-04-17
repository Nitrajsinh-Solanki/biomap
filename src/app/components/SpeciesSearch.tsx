// biomap\src\app\components\SpeciesSearch.tsx


"use client";
import { useRef, useState } from "react";
import { Species, SearchHistory } from "./SpeciesTypes";

interface SpeciesSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent | string) => void;
  filters: {
    conservationStatus: string;
    region: string;
    kingdom: string;
    habitat: string;
    threatLevel: string;
  };
  handleFilterChange: (filterName: string, value: string) => void;
  clearFilters: () => void;
  availableFilters: {
    conservationStatuses: string[];
    regions: string[];
    kingdoms: string[];
    habitats: string[];
    threatLevels: string[];
  };
  species: Species[];
  searchLoading: boolean;
  searchHistory: SearchHistory[];
  handleHistoryItemClick: (item: SearchHistory) => void;
  clearSearchHistory: () => void;
}

export default function SpeciesSearch({
  searchQuery,
  setSearchQuery,
  handleSearch,
  filters,
  handleFilterChange,
  clearFilters,
  availableFilters,
  species,
  searchLoading,
  searchHistory,
  handleHistoryItemClick,
  clearSearchHistory,
}: SpeciesSearchProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // handle real time input changes and generating the search suggestions is here 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      
      const newSuggestions = species
        .filter(
          (s) =>
            s.scientificName.toLowerCase().includes(query.toLowerCase()) ||
            s.commonName.toLowerCase().includes(query.toLowerCase())
        )
        .map((s) =>
          s.commonName !== "No common name" ? s.commonName : s.scientificName
        )
        .slice(0, 5);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  //handling the suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  return (
    <>
      {/* search bar is here  */}
      <form onSubmit={handleSearch} className="mb-6 relative">
        <div className="flex">
          <input
            type="text"
            ref={searchInputRef}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by scientific name, common name, or description..."
            className="text-gray-600 flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onFocus={() =>
              searchQuery.length > 1 && setShowSuggestions(true)
            }
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>


        {/* autocomplete suggestion is here */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-800"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>

      {/* filters is implemented here  */}
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Advanced Filters
          </h2>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear All Filters
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Conservation Status
            </label>
            <select
              value={filters.conservationStatus}
              onChange={(e) =>
                handleFilterChange("conservationStatus", e.target.value)
              }
              className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {availableFilters.conservationStatuses.map(
                (status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange("region", e.target.value)}
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Regions</option>
              {availableFilters.regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Kingdom
            </label>
            <select
              value={filters.kingdom}
              onChange={(e) =>
                handleFilterChange("kingdom", e.target.value)
              }
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Kingdoms</option>
              {availableFilters.kingdoms.map((kingdom, index) => (
                <option key={index} value={kingdom}>
                  {kingdom}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Habitat
            </label>
            <select
              value={filters.habitat}
              onChange={(e) =>
                handleFilterChange("habitat", e.target.value)
              }
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Habitats</option>
              {availableFilters.habitats.map((habitat, index) => (
                <option key={index} value={habitat}>
                  {habitat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Threat Level
            </label>
            <select
              value={filters.threatLevel}
              onChange={(e) =>
                handleFilterChange("threatLevel", e.target.value)
              }
              className="text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Threat Levels</option>
              {availableFilters.threatLevels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* search history implemented here  */}
      {searchHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Searches
            </h2>
            <button
              onClick={clearSearchHistory}
              className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
            >
              Clear History
            </button>
          </div>
          <div className="space-y-2">
            {searchHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => handleHistoryItemClick(item)}
              >
                <div>
                  <span className="font-medium text-gray-800">
                    {item.query}
                  </span>
                  <div className="flex flex-wrap mt-1">
                    {item.filters.conservationStatus && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-1">
                        Status: {item.filters.conservationStatus}
                      </span>
                    )}
                    {item.filters.region && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2 mb-1">
                        Region: {item.filters.region}
                      </span>
                    )}
                    {item.filters.kingdom && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full mr-2 mb-1">
                        Kingdom: {item.filters.kingdom}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
