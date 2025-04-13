// biomap\src\app\components\SpaceGallery.tsx



'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface NasaMediaLink {
  href: string;
  rel: string;
  render?: string;
}

interface NasaMediaData {
  center: string;
  title: string;
  nasa_id: string;
  media_type: string;
  description: string;
  date_created: string;
  keywords: string[];
}

interface NasaMediaItem {
  href: string;
  data: NasaMediaData[];
  links: NasaMediaLink[];
}

interface SpaceGalleryProps {
  onSelectMedia: (media: NasaMediaItem) => void;
}

export default function SpaceGallery({ onSelectMedia }: SpaceGalleryProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || 'earth';
  const mediaType = searchParams.get('media_type') || 'image';
  const yearStart = searchParams.get('year_start') || '';
  const yearEnd = searchParams.get('year_end') || '';
  
  const [results, setResults] = useState<NasaMediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setResults([]);
    setPage(1);
    fetchData(1);
  }, [query, mediaType, yearStart, yearEnd]);

  const fetchData = async (pageNum: number) => {
    try {
      setLoading(true);
      
      // Build the search URL with parameters
      let url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
      
      // two options for media type first is images and second one is videos 
      const filteredMediaType = mediaType === 'audio' ? 'image' : mediaType;
      if (filteredMediaType) url += `&media_type=${filteredMediaType}`;
      
      if (yearStart) url += `&year_start=${yearStart}`;
      if (yearEnd) url += `&year_end=${yearEnd}`;
      if (pageNum > 1) url += `&page=${pageNum}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`NASA API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.collection && data.collection.items) {
        // filtering is implemented here 
        const filteredItems = data.collection.items.filter((item: NasaMediaItem) => {
          const mediaType = item.data?.[0]?.media_type;
          return mediaType === 'image' || mediaType === 'video';
        });
        
        if (pageNum === 1) {
          setResults(filteredItems);
        } else {
          setResults(prev => [...prev, ...filteredItems]);
        }
        
        
        setHasMore(data.collection.links && 
          data.collection.links.some((link: NasaMediaLink) => link.rel === 'next'));
      } else {
        setResults([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching NASA data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>Error: {error}</p>
        <p className="text-sm mt-2">Please try again or modify your search criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {loading && page === 1 ? 'Searching...' : `Results for "${query}"`}
      </h2>
      
      {results.length === 0 && !loading ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
          No results found. Try different search terms or filters.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((item, index) => {
              const metadata = item.data && item.data[0];
              
              if (!metadata) return null;
              
              // Getting thumbnail image to showcase
              const thumbnail = item.links && item.links.find((link: NasaMediaLink) => link.rel === 'preview');
              
              // Skip items without thumbnails
              if (!thumbnail) return null;
              
              return (
                <div 
                  key={`${metadata.nasa_id}-${index}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => onSelectMedia(item)}
                >
                  <div className="relative h-48">
                    {metadata.media_type === 'image' ? (
                      <Image
                        src={`/api/image-proxy?url=${encodeURIComponent(thumbnail.href)}`}
                        alt={metadata.title || 'NASA image'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover"
                        unoptimized={true} 
                      />
                    ) : metadata.media_type === 'video' ? (
                      <div className="relative h-full bg-black flex items-center justify-center">
                        <Image
                          src={`/api/image-proxy?url=${encodeURIComponent(thumbnail.href)}`}
                          alt={metadata.title || 'NASA video'}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover opacity-80"
                          unoptimized={true}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white bg-opacity-75 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                      {metadata.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        {new Date(metadata.date_created).toLocaleDateString()}
                      </p>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                        {metadata.media_type}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {loading && (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}
          
          {hasMore && !loading && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
