// biomap\src\app\components\SpeciesTypes.tsx

export interface Species {
    id: string;
    scientificName: string;
    commonName: string;
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    conservationStatus: string;
    habitat: string;
    region: string;
    description: string;
    imageUrl: string;
    threatLevel: string;
    populationTrend: string;
  }
  
  export interface SearchHistory {
    id: string;
    query: string;
    filters: {
      conservationStatus: string;
      region: string;
      kingdom: string;
      habitat: string;
      threatLevel: string;
    };
    timestamp: number;
  }
  