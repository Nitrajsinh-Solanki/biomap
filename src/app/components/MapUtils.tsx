// biomap\src\app\components\MapUtils.tsx

'use client';
import { useMap } from 'react-leaflet';

export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  status: string;
  latitude: number;
  longitude: number;
  count: number;
}

export interface Hotspot {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  radius: number;
  speciesCount: number;
}

export function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 8);
  return null;
}
