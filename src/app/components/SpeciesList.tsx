// biomap\src\app\components\SpeciesList.tsx


"use client";
import { Species } from "./SpeciesTypes";

interface SpeciesListProps {
  filteredSpecies: Species[];
  currentItems: Species[];
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  handleSpeciesSelect: (species: Species) => void;
  searchLoading: boolean;
  clearFilters: () => void;
}

export default function SpeciesList({
  filteredSpecies,
  currentItems,
  currentPage,
  totalPages,
  paginate,
  handleSpeciesSelect,
  searchLoading,
  clearFilters,
}: SpeciesListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Search Results{" "}
          {filteredSpecies.length > 0 &&
            `(${filteredSpecies.length} species found)`}
        </h2>
        {searchLoading && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Searching...</span>
          </div>
        )}
      </div>

      {/* display message and reset option if no species found  */}
      {filteredSpecies.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-md text-center">
          <p className="text-gray-600 mb-4">
            No species found matching your search criteria.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          {/* species grid display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSpeciesSelect(item)}
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.commonName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/images/species-placeholder.jpg";
                    }}
                  />
                  {item.conservationStatus !== "Not Evaluated" &&
                    item.conservationStatus !== "Least Concern" && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.conservationStatus}
                      </div>
                    )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {item.commonName}
                  </h3>
                  <p className="text-sm text-gray-600 italic mb-2">
                    {item.scientificName}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {item.kingdom}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.region}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* pagination control is here  */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l-md border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Previous
                </button>
                {Array.from(
                  { length: Math.min(5, totalPages) },
                  (_, i) => {
                    
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => paginate(pageNum)}
                        className={`px-3 py-1 border-t border-b ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white"
                            : "bg-white text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-r-md border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
