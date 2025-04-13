// biomap\src\app\components\SpaceMediaDetail.tsx

'use client';

import { useState, useEffect } from 'react';
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

interface SpaceMediaDetailProps {
  media: NasaMediaItem;
  onClose: () => void;
}

export default function SpaceMediaDetail({ media, onClose }: SpaceMediaDetailProps) {
  const [mediaAssets, setMediaAssets] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAsset, setActiveAsset] = useState<string | null>(null);

  const metadata = media.data && media.data[0];

  useEffect(() => {
    const fetchMediaAssets = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(media.href);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch media assets: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setMediaAssets(data);
          
          if (data.length > 0) {
            if (metadata.media_type === 'video') {
              const mp4Asset = data.find((asset: string) => asset.endsWith('.mp4'));
              setActiveAsset(mp4Asset || data[0]);
            } else {
              const preferredAsset = data.find((asset: string) => 
                asset.includes('~large') || 
                asset.includes('~medium') || 
                (!asset.includes('~') && !asset.includes('orig'))
              );
              setActiveAsset(preferredAsset || data[0]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching media assets:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (media && media.href) {
      fetchMediaAssets();
    }
  }, [media, metadata]);

  if (!metadata) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>Error: Media metadata not available</p>
        <button 
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-white text-red-600 border border-red-300 rounded-md hover:bg-red-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  const renderMedia = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96 bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      );
    }

    if (error || !activeAsset) {
      return (
        <div className="flex justify-center items-center h-96 bg-gray-100">
          <div className="text-center text-gray-500">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="mt-2">Failed to load media</p>
          </div>
        </div>
      );
    }

    if (metadata.media_type === 'image') {
      return (
        <div className="relative h-[60vh] bg-black">

<Image
  src={`/api/image-proxy?url=${encodeURIComponent(activeAsset)}`}
  alt={metadata.title || 'NASA image'}
  fill
  sizes="100vw"
  className="object-contain"
  unoptimized={true} 
/>
        </div>
      );
    } else if (metadata.media_type === 'video') {
      return (
        <div className="relative aspect-video bg-black">
          <video 
            controls 
            className="w-full h-full"
            poster={media.links?.find((link: NasaMediaLink) => link.rel === 'preview')?.href}
          >
            <source src={activeAsset} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (metadata.media_type === 'audio') {
      return (
        <div className="p-8 bg-gray-100 rounded-lg">
          <audio controls className="w-full">
            <source src={activeAsset} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          
          <div className="mt-4 flex justify-center">
            <svg className="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Media Details</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {renderMedia()}
      
      {mediaAssets.length > 1 && (
        <div className="p-4 border-t border-b bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Available Formats:</h3>
          <div className="flex flex-wrap gap-2">
            {mediaAssets.map((asset, index) => {
              const fileName = asset.split('/').pop() || '';
              let format = fileName.split('.').pop()?.toUpperCase() || '';
              
              if (fileName.includes('~')) {
                const size = fileName.split('~')[1].split('.')[0];
                format = `${size.toUpperCase()} (${format})`;
              }
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveAsset(asset)}
                  className={`px-3 py-1 text-xs rounded-full ${
                    activeAsset === asset 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {format}
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{metadata.title}</h1>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
          {metadata.date_created && (
            <div>
              <span className="font-medium">Date:</span> {formatDate(metadata.date_created)}
            </div>
          )}
          {metadata.center && (
            <div>
              <span className="font-medium">NASA Center:</span> {metadata.center}
            </div>
          )}
          {metadata.nasa_id && (
            <div>
              <span className="font-medium">NASA ID:</span> {metadata.nasa_id}
            </div>
          )}
        </div>
        
        {metadata.description && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{metadata.description}</p>
          </div>
        )}
        
        {metadata.keywords && metadata.keywords.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {metadata.keywords.map((keyword: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Gallery
          </button>
          
          <a
            href={activeAsset || ''}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Download {metadata.media_type.charAt(0).toUpperCase() + metadata.media_type.slice(1)}
          </a>
        </div>
      </div>
    </div>
  );
}
