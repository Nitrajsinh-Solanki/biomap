// biomap\src\app\components\MapComponent.tsx

'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { MapSearch } from './MapSearch';
import { ChangeMapView, Species, Hotspot } from './MapUtils';

//fixing the leaflet icon issues in next js 
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  const fetchSpeciesData = async (lat: number, lng: number, radius: number = 100) => {
    try {
      setLoading(true);
      
      // using gbif api for the data 
      const response = await axios.get('https://api.gbif.org/v1/occurrence/search', {
        params: {
          decimalLatitude: `${lat - radius/111},${lat + radius/111}`,
          decimalLongitude: `${lng - radius/111},${lng + radius/111}`,
          limit: 300
        }
      });
      
      const occurrences = (response.data as any).results;


      const speciesMap = new Map();
      
      occurrences.forEach((occurrence: any) => {
        if (occurrence.decimalLatitude && occurrence.decimalLongitude) {
          const key = occurrence.scientificName || 'Unknown species';
          
          if (!speciesMap.has(key)) {
            speciesMap.set(key, {
              id: occurrence.key,
              scientificName: occurrence.scientificName || 'Unknown species',
              commonName: occurrence.vernacularName || 'No common name',
              status: occurrence.iucnRedListCategory || 'Unknown',
              latitude: occurrence.decimalLatitude,
              longitude: occurrence.decimalLongitude,
              count: 1
            });
          } else {
            const existing = speciesMap.get(key);
            existing.count += 1;
          }
        }
      });
      
      setSpecies(Array.from(speciesMap.values()));
      
      generateHotspots(Array.from(speciesMap.values()));
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching species data:', error);
      setError('Failed to load species data. Please try again.');
      setLoading(false);
    }
  };
  
  const generateHotspots = (speciesData: Species[]) => {
    const hotspotMap = new Map();
    
    speciesData.forEach(species => {
      const gridKey = `${Math.round(species.latitude * 10) / 10},${Math.round(species.longitude * 10) / 10}`;
      
      if (!hotspotMap.has(gridKey)) {
        hotspotMap.set(gridKey, {
          id: gridKey,
          name: `Biodiversity Hotspot`,
          description: 'Area with high species concentration',
          latitude: Math.round(species.latitude * 10) / 10,
          longitude: Math.round(species.longitude * 10) / 10,
          radius: 5000, 
          speciesCount: 1
        });
      } else {
        const hotspot = hotspotMap.get(gridKey);
        hotspot.speciesCount += 1;
        if (hotspot.speciesCount > 10) {
          hotspot.name = 'Major Biodiversity Hotspot';
          hotspot.radius = 10000; 
        }
      }
    });
    
    const significantHotspots = Array.from(hotspotMap.values())
      .filter(hotspot => hotspot.speciesCount > 3);
    
    setHotspots(significantHotspots);
  };
  
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
          fetchSpeciesData(latitude, longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setMapCenter([-3.4653, -62.2159]);
          fetchSpeciesData(-3.4653, -62.2159);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
      setMapCenter([-3.4653, -62.2159]);
      fetchSpeciesData(-3.4653, -62.2159);
    }
  };
  

  // handling the search functionality 
  const handleSearch = (lat: number, lng: number) => {
    setMapCenter([lat, lng]);
    fetchSpeciesData(lat, lng);
  };
  
  useEffect(() => {
    getUserLocation();
  }, []);
  
  const filteredSpecies = selectedFilter === 'all' 
    ? species 
    : species.filter(s => s.status.toLowerCase().includes(selectedFilter.toLowerCase()));
  
  return (
    <div className="flex flex-col h-[1000px]">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Interactive Biodiversity Map</h2>
        <p className="text-gray-600 mb-4">
          Explore species distribution and biodiversity hotspots around the world. 
          Use the search to find specific locations or use your current location.
        </p>
        
        <MapSearch onSearch={handleSearch} />
        
        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={() => getUserLocation()}
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            Use My Location
          </button>
          
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-600"
          >
            <option value="all">All Species</option>
            <option value="endangered">Endangered</option>
            <option value="vulnerable">Vulnerable</option>
            <option value="threatened">Threatened</option>
            <option value="least concern">Least Concern</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex-grow flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="flex-grow flex items-center justify-center bg-red-50 rounded-lg p-4 text-red-700">
          {error}
        </div>
      ) : (
        <div className="flex-grow rounded-lg overflow-hidden shadow-md">
          <MapContainer 
            center={mapCenter}
            zoom={8}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>
                  <div>
                    <h3 className="font-bold">Your Location</h3>
                    <p>Lat: {userLocation[0].toFixed(4)}, Lng: {userLocation[1].toFixed(4)}</p>
                  </div>
                </Popup>
              </Marker>
            )}



            {filteredSpecies.map((species) => (
              <Marker 
                key={`${species.id}-${species.latitude}-${species.longitude}`}
                position={[species.latitude, species.longitude]}
                icon={L.divIcon({
                  className: 'custom-div-icon',
                  html: `<div style="background-color: rgba(76, 175, 80, 0.6); width: ${10 + species.count}px; height: ${10 + species.count}px; border-radius: 50%; border: 2px solid #4CAF50;"></div>`,
                  iconSize: [30, 30],
                  iconAnchor: [15, 15]
                })}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{species.scientificName}</h3>
                    <p><span className="font-semibold">Common name:</span> {species.commonName}</p>
                    <p><span className="font-semibold">Status:</span> {species.status || 'Unknown'}</p>
                    <p><span className="font-semibold">Observations:</span> {species.count}</p>
                    <p><span className="font-semibold">Coordinates:</span> {species.latitude.toFixed(4)}, {species.longitude.toFixed(4)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {hotspots.map((hotspot) => (
              <Circle
                key={hotspot.id}
                center={[hotspot.latitude, hotspot.longitude]}
                radius={hotspot.radius}
                pathOptions={{
                  fillColor: hotspot.speciesCount > 10 ? '#FF5722' : '#FFC107',
                  fillOpacity: 0.4,
                  weight: 1,
                  color: hotspot.speciesCount > 10 ? '#E64A19' : '#FFA000'
                }}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{hotspot.name}</h3>
                    <p>{hotspot.description}</p>
                    <p><span className="font-semibold">Species count:</span> {hotspot.speciesCount}</p>
                    <p><span className="font-semibold">Coordinates:</span> {hotspot.latitude.toFixed(4)}, {hotspot.longitude.toFixed(4)}</p>
                  </div>
                </Popup>
              </Circle>
            ))}
            
            <ChangeMapView center={mapCenter} />
          </MapContainer>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Data provided by the Global Biodiversity Information Facility (GBIF) API.</p>
        <p>Biodiversity hotspots are calculated based on species density in a given area.</p>
        <div className="flex items-center mt-2">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
          <span className="mr-3">Species observation</span>
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span>
          <span className="mr-3">Biodiversity hotspot</span>
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
          <span>Major biodiversity hotspot</span>
        </div>
      </div>
    </div>
  );
}
