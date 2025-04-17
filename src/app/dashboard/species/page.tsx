// biomap\src\app\dashboard\species\page.tsx



"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "../../components/DashboardNavbar";
import Footer from "../../components/Footer";
import axios from "axios";
import SpeciesSearch from "../../components/SpeciesSearch";
import SpeciesList from "../../components/SpeciesList";
import SpeciesDetail from "../../components/SpeciesDetail";
import { Species, SearchHistory } from "../../components/SpeciesTypes";

export default function SpeciesPage() {
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [species, setSpecies] = useState<Species[]>([]);
  const [filteredSpecies, setFilteredSpecies] = useState<Species[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [relatedSpecies, setRelatedSpecies] = useState<Species[]>([]);
  const [filters, setFilters] = useState({
    conservationStatus: "",
    region: "",
    kingdom: "",
    habitat: "",
    threatLevel: "",
  });
  const [availableFilters, setAvailableFilters] = useState({
    conservationStatuses: [] as string[],
    regions: [] as string[],
    kingdoms: [] as string[],
    habitats: [] as string[],
    threatLevels: [] as string[],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const router = useRouter();

  // fetching the  initial data and check for authentication
  useEffect(() => {
    const checkAuth = async () => {
     
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      if (!token || !userData) {
        router.push("/login");
        return;
      }
      try {
        setUser(JSON.parse(userData));
        await fetchSpeciesData();
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }
      
      //loading the search history from the local storage  
      const history = localStorage.getItem("searchHistory");
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  // taxonomy data fetching from gbif api 
const fetchTaxonomyData = async (scientificName: string): Promise<{
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
  }> => {
    try {
      const matchResponse = await axios.get(
        `https://api.gbif.org/v1/species/match?name=${encodeURIComponent(scientificName)}`
      );
      
      // defining the type for the match response data
      interface GbifResponse  {
        usageKey?: number;
        kingdom?: string;
        phylum?: string;
        class?: string;
        order?: string;
        family?: string;
        genus?: string;
        [key: string]: any; 
      }
      
      const matchData = matchResponse.data as GbifResponse ;
      
      if (matchData && matchData.usageKey) {
        const taxonomyResponse = await axios.get(
          `https://api.gbif.org/v1/species/${matchData.usageKey}`
        );
  
        
        const data = taxonomyResponse.data as GbifResponse;
        return {
          kingdom: data.kingdom || "Unknown",
          phylum: data.phylum || "Unknown",
          class: data.class || "Unknown",
          order: data.order || "Unknown",
          family: data.family || "Unknown",
          genus: data.genus || "Unknown",
        };
      }
    } catch (error) {
      console.error("Error fetching taxonomy data:", error);
    }
    
    return {
      kingdom: "Unknown",
      phylum: "Unknown",
      class: "Unknown",
      order: "Unknown",
      family: "Unknown",
      genus: "Unknown",
    };
  };


// fetch species data from inaturalist API
const fetchSpeciesData = async () => {
    try {
      setSearchLoading(true);
      const response = await axios.get("https://api.inaturalist.org/v1/taxa", {
        params: {
          per_page: 100,
          order_by: "observations_count",
          rank: "species",
          is_active: true,
        },
      });
      
      // define interface for iNaturalist API response
      interface INaturalistResponse {
        results: Array<{
          id?: number;
          name?: string;
          preferred_common_name?: string;
          wikipedia_url?: string;
          default_photo?: {
            medium_url?: string;
          };
          [key: string]: any;
        }>;
        [key: string]: any;
      }
      
      const responseData = response.data as INaturalistResponse;
      
      const speciesDataPromises = responseData.results.map(async (item) => {
        const taxonomyData = await fetchTaxonomyData(item.name || "");
        
        return {
          id: item.id?.toString() || "",
          scientificName: item.name || "Unknown",
          commonName: item.preferred_common_name || "No common name",
          kingdom: taxonomyData.kingdom,
          phylum: taxonomyData.phylum,
          class: taxonomyData.class,
          order: taxonomyData.order,
          family: taxonomyData.family,
          genus: taxonomyData.genus,
          conservationStatus: "Not Evaluated",
          habitat: "Various",
          region: "Global",
          description: item.wikipedia_url
            ? `See more at: ${item.wikipedia_url}`
            : "No description available",
          imageUrl:
            item.default_photo?.medium_url || "/images/species-placeholder.jpg",
          threatLevel: "Unknown",
          populationTrend: "Unknown",
        };
      });
      
      const speciesData = await Promise.all(speciesDataPromises);
      setSpecies(speciesData);
      setFilteredSpecies(speciesData);
      
      const kingdoms = [
        ...new Set(speciesData.map((s: Species) => s.kingdom)),
      ].filter(Boolean) as string[];
      
      setAvailableFilters({
        conservationStatuses: [
          "Not Evaluated",
          "Least Concern",
          "Vulnerable",
          "Endangered",
          "Critically Endangered",
        ],
        regions: [
          "Global",
          "North America",
          "South America",
          "Europe",
          "Africa",
          "Asia",
          "Australia",
        ],
        kingdoms: kingdoms,
        habitats: ["Various", "Terrestrial", "Marine", "Freshwater"],
        threatLevels: ["Unknown", "Low", "Medium", "High", "Critical"],
      });
      setSearchLoading(false);
    } catch (error) {
      console.error("Error fetching species data:", error);
      setSearchLoading(false);
    }
  };
  
    

  // handling the search submission
  const handleSearch = (e: React.FormEvent | string) => {
    if (e && typeof e !== "string") {
      e.preventDefault();
    }
    const query = typeof e === "string" ? e : searchQuery;
    setSearchLoading(true);
  
    let results = species.filter((s: Species) => {
      const matchesSearch =
        query === "" ||
        s.scientificName.toLowerCase().includes(query.toLowerCase()) ||
        s.commonName.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase());
      const matchesConservation =
        filters.conservationStatus === "" ||
        s.conservationStatus === filters.conservationStatus;
      const matchesRegion =
        filters.region === "" || s.region === filters.region;
      const matchesKingdom =
        filters.kingdom === "" || s.kingdom === filters.kingdom;
      const matchesHabitat =
        filters.habitat === "" || s.habitat === filters.habitat;
      const matchesThreat =
        filters.threatLevel === "" || s.threatLevel === filters.threatLevel;
      return (
        matchesSearch &&
        matchesConservation &&
        matchesRegion &&
        matchesKingdom &&
        matchesHabitat &&
        matchesThreat
      );
    });
    setFilteredSpecies(results);
    setCurrentPage(1);
    setSearchLoading(false);
    

    // adding search query in local storage 
    if (query) {
      const newSearch: SearchHistory = {
        id: Date.now().toString(),
        query,
        filters,
        timestamp: Date.now(),
      };
      const updatedHistory = [newSearch, ...searchHistory.slice(0, 9)];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    handleSearch(searchQuery);
  }, [filters]);

  const handleSpeciesSelect = async (species: Species) => {
    let speciesWithTaxonomy = { ...species };
    
    if (
      species.kingdom === "Unknown" ||
      species.phylum === "Unknown" ||
      species.class === "Unknown" ||
      species.order === "Unknown" ||
      species.family === "Unknown" ||
      species.genus === "Unknown"
    ) {
      const taxonomyData = await fetchTaxonomyData(species.scientificName);
      speciesWithTaxonomy = {
        ...species,
        ...taxonomyData,
      };
    }
    
    setSelectedSpecies(speciesWithTaxonomy);
    
    // finding the  related species (same genus or family)
    const related = filteredSpecies
      .filter(
        (s) =>
          s.id !== species.id &&
          (s.genus === speciesWithTaxonomy.genus || s.family === speciesWithTaxonomy.family)
      )
      .slice(0, 3);
    setRelatedSpecies(related);
  };

  const handleCloseDetails = () => {
    setSelectedSpecies(null);
    setRelatedSpecies([]);
  };

  // handling the  pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSpecies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setFilters({
      conservationStatus: "",
      region: "",
      kingdom: "",
      habitat: "",
      threatLevel: "",
    });
    setSearchQuery("");
    handleSearch("");
  };

  const handleHistoryItemClick = (item: SearchHistory) => {
    setSearchQuery(item.query);
    setFilters(item.filters);
    handleSearch(item.query);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Species Database
          </h1>
          
          {/* search component is here  */}
          <SpeciesSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            filters={filters}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            availableFilters={availableFilters}
            species={species}
            searchLoading={searchLoading}
            searchHistory={searchHistory}
            handleHistoryItemClick={handleHistoryItemClick}
            clearSearchHistory={clearSearchHistory}
          />
          
          {/* species list component is here  */}
          <SpeciesList 
            filteredSpecies={filteredSpecies}
            currentItems={currentItems}
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            handleSpeciesSelect={handleSpeciesSelect}
            searchLoading={searchLoading}
            clearFilters={clearFilters}
          />
        </div>
        
        {/* species detail modal component  */}
        {selectedSpecies && (
          <SpeciesDetail 
            selectedSpecies={selectedSpecies}
            relatedSpecies={relatedSpecies}
            handleCloseDetails={handleCloseDetails}
            handleSpeciesSelect={handleSpeciesSelect}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
