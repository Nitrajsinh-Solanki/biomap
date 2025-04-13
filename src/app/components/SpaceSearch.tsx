
// biomap\src\app\components\SpaceSearch.tsx

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SpaceSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [mediaType, setMediaType] = useState(
    searchParams.get('media_type') === 'video' ? 'video' : 'image'
  );
  const [yearStart, setYearStart] = useState(searchParams.get('year_start') || '');
  const [yearEnd, setYearEnd] = useState(searchParams.get('year_end') || '');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (mediaType) params.set('media_type', mediaType);
    if (yearStart) params.set('year_start', yearStart);
    if (yearEnd) params.set('year_end', yearEnd);

    router.push(`/dashboard/space?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch}>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-grow">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search NASA media (e.g., Mars, Apollo, ISS)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-600 outline-none"
              aria-label="Search query"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mt-2">
          <button
            type="button"
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
            className="text-sm text-green-600 hover:text-green-800 focus:outline-none"
          >
            {isAdvancedSearch ? 'Hide advanced search' : 'Show advanced search'}
          </button>
        </div>

        {isAdvancedSearch && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700 mb-1">
                Media Type
              </label>
              <select
                id="mediaType"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
              >
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>
            </div>

            <div>
              <label htmlFor="yearStart" className="block text-sm font-medium text-gray-700 mb-1">
                Year Start
              </label>
              <input
                id="yearStart"
                type="number"
                min="1920"
                max={new Date().getFullYear()}
                value={yearStart}
                onChange={(e) => setYearStart(e.target.value)}
                placeholder="e.g., 2000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              />
            </div>

            <div>
              <label htmlFor="yearEnd" className="block text-sm font-medium text-gray-700 mb-1">
                Year End
              </label>
              <input
                id="yearEnd"
                type="number"
                min="1920"
                max={new Date().getFullYear()}
                value={yearEnd}
                onChange={(e) => setYearEnd(e.target.value)}
                placeholder="e.g., 2023"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
